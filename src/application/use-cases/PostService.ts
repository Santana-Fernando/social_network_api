import { injectable, inject } from "tsyringe";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

import { IPost } from "../../domain/interface/IPost";
import { IPostService } from "../interface/IPostService";
import { PostViewModel } from "../ViewModel/PostViewModel";
import { ViewModelToDomain } from "../../shared/utils/Post/ViewModelToDomain";
import { DomainToViewModel } from "../../shared/utils/Post/DomainToViewModel";

@injectable()
export class PostService implements IPostService {

    constructor(
        @inject("IPost")
        private postRepository: IPost
    ) {}

    async findAll(): Promise<PostViewModel[]> {
        const posts = await this.postRepository.findAll()
        return posts.map(post => DomainToViewModel.toViewModel(post));
    }

    async findById(id: number): Promise<PostViewModel | null> {
        const post = await this.postRepository.findById(id);

        if (!post) {
            return null;
        }

        return DomainToViewModel.toViewModel(post);
    }

    async findTopLiked(): Promise<PostViewModel[]> {
        const posts = await this.postRepository.findTopLiked()
        return posts.map(post => DomainToViewModel.toViewModel(post));
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

            await this.postRepository.update(post);
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao deleta post post');
        }
    }

    async insert(post: PostViewModel): Promise<void> {
        try {
            await this.verifyErrors(post);

            var postDomain = ViewModelToDomain.toDomain(post);
            
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