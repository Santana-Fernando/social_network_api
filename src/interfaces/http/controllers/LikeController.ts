import { inject, injectable } from "tsyringe";
import { ILikeService } from "../../../application/interface/ILikeService";
import { Request, Response } from "express";

@injectable()
export class LikeController {
    constructor(
        @inject("ILikeService")
        private likeService: ILikeService
    ) {}

    async like(req: Request, res: Response) {
        try {
            const { postId } = req.body;
            const autorId = (req as any).user?.id;
            
            await this.likeService.like(autorId, postId);

            return res.status(201).json({
                message: "Curtido"
            });

        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao dar like",
                error: error.message
            });
        }
    }

    async deslike(req: Request, res: Response) {
        try {
            const { postId } = req.body;
            const autorId = (req as any).user?.id;

            await this.likeService.deslike(autorId, postId);

            return res.status(201).json({
                message: "descurtido"
            });
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao dar deslike",
                error: error.message
            });
        }
    }

    async consult(req: Request, res: Response) {
        try {
            const postId = Number(req.params.id);

            if (isNaN(postId)) {
            return res.status(400).json({
                message: "ID inválido"
            });
            }

            const posts = await this.likeService.consult(postId);

            return res.status(200).json(posts);

        } catch (error: any) {
            return res.status(500).json({
            message: "Erro ao listar likes",
            error: error.message
            });
        }
    }
}