import { Repository } from "typeorm";
import { IPost } from "../../../domain/interface/IPost";
import { PostEntity } from "../entities/PostEntity";
import { Post } from "../../../domain/entities/Post";
import { EntityToDomain } from "../../../shared/utils/Post/EntityToDomain";

export class PostRepository implements IPost {

    constructor(private readonly repo: Repository<PostEntity>) {}

    async findByAutor(idAutor: number): Promise<Post[]> {
        const { raw, entities } = await this.repo
            .createQueryBuilder('post')
            .leftJoin('likes', 'l', 'l.post_id = post.id')
            .select([
            'post.id',
            'post.titulo',
            'post.conteudo',
            'post.autor_id',
            'post.data_cadastro',
            'post.data_atualizacao'
            ])
            .addSelect('COUNT(l.post_id)', 'likes_count')
            .where('post.autor_id = :idAutor', { idAutor })
            .groupBy('post.id')
            .getRawAndEntities();

        return entities.map((entity, index) => {
            const likesCount = Number(raw[index].likes_count);

            return {
            ...EntityToDomain.toPost(entity),
            likesCount
            };
        });
    }
    
    async findAll(): Promise<Post[]> {
        const { raw, entities } = await this.repo
            .createQueryBuilder('post')
            .leftJoin('likes', 'l', 'l.post_id = post.id')
            .select([
            'post.id',
            'post.titulo',
            'post.conteudo',
            'post.autor_id',
            'post.data_cadastro',
            'post.data_atualizacao'
            ])
            .addSelect('COUNT(l.post_id)', 'likes_count')
            .groupBy('post.id')
            .getRawAndEntities();

        return entities.map((entity, index) => {
            const likesCount = Number(raw[index].likes_count);

            return {
            ...EntityToDomain.toPost(entity),
            likesCount
            };
        });
    }

    async findById(id: number): Promise<Post | null> {
        const { raw, entities } = await this.repo
            .createQueryBuilder('post')
            .leftJoin('likes', 'l', 'l.post_id = post.id')
            .select([
            'post.id',
            'post.titulo',
            'post.conteudo',
            'post.autor_id',
            'post.data_cadastro',
            'post.data_atualizacao'
            ])
            .addSelect('COUNT(l.post_id)', 'likes_count')
            .where('post.id = :id', { id })
            .groupBy('post.id')
            .getRawAndEntities();

        if (!entities.length) return null;

        const likesCount = Number(raw[0].likes_count);

        return {
            ...EntityToDomain.toPost(entities[0]),
            likesCount
        };
    }

    async findTopLiked(): Promise<Post[]> {
        const { raw, entities } = await this.repo
            .createQueryBuilder('post')
            .leftJoin('likes', 'l', 'l.post_id = post.id')
            .select([
            'post.id',
            'post.titulo',
            'post.conteudo',
            'post.autor_id',
            'post.data_cadastro',
            'post.data_atualizacao'
            ])
            .addSelect('COUNT(l.post_id)', 'likes_count')
            .groupBy('post.id')
            .orderBy('likes_count', 'DESC')
            .limit(10)
            .getRawAndEntities();

        return entities.map((entity, index) => {
            const likesCount = Number(raw[index].likes_count);

            return {
            ...EntityToDomain.toPost(entity),
            likesCount
            };
        });
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete(id);
    }

    async update(post: Post): Promise<void> {
        await this.repo.update(post.id, {
            titulo: post.titulo,
            conteudo: post.conteudo
        });
    }

    async insert(post: Post): Promise<void> {
        const entity = this.repo.create({
            titulo: post.titulo,
            conteudo: post.conteudo,
            autor_id: post.autorId,
            data_cadastro: new Date(),
            data_atualizacao: new Date()
        });
        await this.repo.save(entity);
    }
    
}