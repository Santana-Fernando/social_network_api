import { Repository } from "typeorm";
import { ILike } from "../../../domain/interface/ILike";
import { LikeEntity } from "../entities/LikeEntity";

export class LikeRepository implements ILike {
    constructor(private readonly repo: Repository<LikeEntity>) {}
    
    async consult(postId: number): Promise<number> {
        const likes = await this.repo.find({ where: { post_id: postId }})

        return likes.length;
    }

    async like(autorId: number, postId: number): Promise<void> {

        const existingLike = await this.repo.findOne({
            where: { autor_id: autorId, post_id: postId }
        });

        if (existingLike) {
            return;
        }

        const like = this.repo.create({
            autor_id: autorId,
            post_id: postId,
            data_cadastro: new Date()
        });

        await this.repo.save(like);
    }

    async deslike(autorId: number, postId: number): Promise<void> {
        await this.repo.delete({
            autor_id: autorId,
            post_id: postId
        });
    }
}