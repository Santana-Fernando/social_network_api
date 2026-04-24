import { Repository } from "typeorm";
import { IPost } from "../../../domain/interface/IPost";
import { PostEntity } from "../entities/PostEntity";
import { Post } from "../../../domain/entities/Post";
import { EntityToDomain } from "../../../shared/utils/Post/EntityToDomain";

export class PostRepository implements IPost {

    constructor(private readonly repo: Repository<PostEntity>) {}
    
    async findAll(): Promise<Post[]> {
        const entities = await this.repo.find();

        return entities.map(entity => EntityToDomain.toPost(entity));
    }

    async findById(id: number): Promise<Post | null> {
        const entity = await this.repo.findOne({
            where: { id }
        });

        if (!entity) return null;

        return EntityToDomain.toPost(entity);
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