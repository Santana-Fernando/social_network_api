import { Repository } from "typeorm";
import { IPost } from "../../../domain/interface/IPost";
import { PostEntity } from "../entities/PostEntity";
import { Post } from "../../../domain/entities/Post";

export class PostRepository implements IPost {

    constructor(private readonly repo: Repository<PostEntity>) {}

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