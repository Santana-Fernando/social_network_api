import { injectable, inject } from "tsyringe";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

import { IPost } from "../../domain/interface/IPost";
import { IPostService } from "../interface/IPostService";
import { PostViewModel } from "../ViewModel/PostViewModel";
import { ViewModelToDomain } from "../../shared/utils/Post/ViewModelToDomain";
import { DomainToViewModel } from "../../shared/utils/Post/DomainToViewModel";
import { redisClient } from "../../infrastructure/cache/redisClient";
import { ILike } from "../../domain/interface/ILike";

@injectable()
export class PostService implements IPostService {

    constructor(
        @inject("IPost")
        private postRepository: IPost,
        
        @inject("ILike")
        private likeRepository: ILike
    ) {}

    async findAll(): Promise<PostViewModel[]> {
        const cacheKey = 'posts:all';

        try {
            const cached = await redisClient.get(cacheKey);

            if (cached) {
                console.log("Tem cache no findAll")
                return JSON.parse(cached);
            }
        } catch (err) {
            console.error('Redis GET error:', err);
        }

        // fallback para o banco
        const posts = await this.postRepository.findAll();

        const postsViewModel = posts.map(post =>
            DomainToViewModel.toViewModel(post)
        );

        try {
            await redisClient.set(
            cacheKey,
            JSON.stringify(postsViewModel),
            { EX: 60 }
            );
        } catch (err) {
            console.error('Redis SET error:', err);
        }

        return postsViewModel;
    }

    async findById(id: number): Promise<PostViewModel | null> {
        const cacheKey = `posts:${id}`;

        try {
            const cached = await redisClient.get(cacheKey);

            if (cached) {
                console.log("Tem cache no findById")
                return JSON.parse(cached);
            }
        } catch (err) {
            console.error('Redis GET error:', err);
        }

        const post = await this.postRepository.findById(id);

        if (!post) {
            return null;
        }

        const postViewModel = DomainToViewModel.toViewModel(post);

        try {
            await redisClient.set(
            cacheKey,
            JSON.stringify(postViewModel),
            { EX: 120 }
            );
        } catch (err) {
            console.error('Redis SET error:', err);
        }

        return postViewModel;
    }

    async findTopLiked(): Promise<PostViewModel[]> {
        const cacheKey = 'posts:top-liked';

        try {
            const cached = await redisClient.get(cacheKey);

            if (cached) {
                console.log("Tem cache no findTopLiked")
                return JSON.parse(cached);
            }
        } catch (err) {
            console.error('Redis GET error:', err);
        }

        const posts = await this.postRepository.findTopLiked();

        const postsViewModel = posts.map(post =>
            DomainToViewModel.toViewModel(post)
        );

        try {
            await redisClient.set(
            cacheKey,
            JSON.stringify(postsViewModel),
            { EX: 30 }
            );
        } catch (err) {
            console.error('Redis SET error:', err);
        }

        return postsViewModel;
    }

    async delete(id: number, idAutor: number): Promise<void> {
        try {
            const post = await this.postRepository.findById(id);

            if(post == null) {
                throw new Error("Postagem não encontrada");
            }

            if(post.autorId != idAutor) {
                throw new Error("Operação não permitida: Não é possível excluir um post que não seja seu.");
            }

            await redisClient.del('posts:all');
            await redisClient.del('posts:top-liked');
            await redisClient.del(`posts:${post.id}`);

            await this.likeRepository.deslike(idAutor, id)
            await this.postRepository.delete(id);
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao deleta post post');
        }
    }

    async update(post: PostViewModel): Promise<void> {
        try {
            const postFinded = await this.postRepository.findById(post.id);

            if(postFinded == null) {
                throw new Error("Postagem não encontrada");
            }

            if(postFinded.autorId != post.autorId) {
                throw new Error("Operação não permitida: Não é possível atualizar um post que não seja seu.");
            }

            await redisClient.del('posts:all');
            await redisClient.del('posts:top-liked');
            await redisClient.del(`posts:${postFinded.id}`);

            await this.postRepository.update(post);
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao deleta post post');
        }
    }

    async insert(post: PostViewModel): Promise<void> {
        try {
            await this.verifyErrors(post);

            var postDomain = ViewModelToDomain.toDomain(post);
            
            await redisClient.del('posts:all');
            await redisClient.del('posts:top-liked');
            await this.postRepository.insert(postDomain)
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao criar post');
        }
    }

    private async verifyErrors(post: PostViewModel) {
        const viewModel = plainToInstance(PostViewModel, post);

        const erros = await validate(viewModel);

        if (erros.length > 0) {
            throw new Error(JSON.stringify(erros));
        }
    }
}