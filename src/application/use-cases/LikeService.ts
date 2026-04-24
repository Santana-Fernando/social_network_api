import { inject, injectable } from "tsyringe";
import { ILike } from "../../domain/interface/ILike";
import { ILikeService } from "../interface/ILikeService";

@injectable()
export class LikeService implements ILikeService {

    constructor(
        @inject("ILike")
        private likeRepository: ILike
    ) {}

    async like(autorId: number, postId: number): Promise<void> {
        try {
            await this.likeRepository.like(autorId, postId);
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao dar like');
        }
    }
    
    async deslike(autorId: number, postId: number): Promise<void> {
        try {
            await this.likeRepository.deslike(autorId, postId);
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao dar deslike');
        }
    }

    async consult(postId: number): Promise<number> {
        return await this.likeRepository.consult(postId);
    }

}