import { Entity, Repository } from "typeorm";
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
        const entities = await this.repo.find({
            order: { likes_count: "DESC" },
            take: 10
        });

        return entities.map(entity => EntityToDomain.toPost(entity));
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
            likes_count: post.likesCount,
            data_cadastro: new Date(),
            data_atualizacao: new Date()
        });
        await this.repo.save(entity);
    }
    
}