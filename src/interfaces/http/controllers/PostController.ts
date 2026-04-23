import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import { IPostService } from "../../../application/interface/IPostService";

@injectable()
export class PostController {
    constructor(
        @inject("IPostService")
        private postService: IPostService
    ) {}

    async insert(req: Request, res: Response) {
        try {
            const data = req.body;

            await this.postService.insert(data);

            return res.status(201).json({
                message: "Postagem feita criado com sucesso"
            });

        } catch (error: any) {
            return res.status(500).json({
                message: "Erro interno no servidor",
                error: error.message
            });
        }
    }
}