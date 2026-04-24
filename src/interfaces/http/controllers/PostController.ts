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

            const userId = (req as any).user?.id;
            data.autorId = userId;

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

    async findAll(req: Request, res: Response) {
        try {
            const posts = await this.postService.findAll();

            return res.status(200).json(posts);
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao listar posts",
                error: error.message
            });
        }
    }

    async findById(req: Request, res: Response) {
        try {
        const id = Number(req.params.id);

        const post = await this.postService.findById(id);

        if (!post) {
            return res.status(404).json({
            message: "Post não encontrado"
            });
        }

        return res.status(200).json(post);
        } catch (error: any) {
        return res.status(500).json({
            message: "Erro ao buscar post",
            error: error.message
        });
        }
    }

    async findTopLiked(req: Request, res: Response) {
        try {
            const posts = await this.postService.findTopLiked();

            return res.status(200).json(posts);
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao buscar ranking",
                error: error.message
            });
        }
    }

    async findByAutor(req: Request, res: Response) {
        try {
            const userId = Number((req as any).user.id);

            console.log(userId)
            const posts = await this.postService.findByAutor(userId);

            return res.status(200).json(posts);
        } catch (error: any) {
            return res.status(500).json({
                message: "Erro ao buscar ranking",
                error: error.message
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const userId = Number((req as any).user.id);

            await this.postService.delete(id, userId);

        return res.status(204).send();
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { titulo, conteudo } = req.body;
            const id = Number(req.params.id);
            const userId = (req as any).user?.id;

            const post = {
                id,
                titulo,
                conteudo,
                autorId: userId
            };

            await this.postService.update(post as any);

            return res.status(200).json({
                message: "Post atualizado com sucesso"
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        }
  }
}