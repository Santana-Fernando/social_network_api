import { injectable, inject } from "tsyringe";
import { Request, Response } from 'express';
import { IUsuarioService } from '../../../application/interface/IUsuarioService';

@injectable()
export class UsuarioController {
    constructor(
        @inject("IUsuarioService")
        private usuarioService: IUsuarioService
    ) {}

    async insert(req: Request, res: Response) {
        try {
            const data = req.body;

            await this.usuarioService.insert(data);

            return res.status(201).json({
                message: "Usuário criado com sucesso"
            });

        } catch (error: any) {
            return res.status(500).json({
                message: "Erro interno no servidor",
                error: error.message
            });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const data = req.body;

            var token = await this.usuarioService.login(data?.email, data?.senha);

            return res.status(201).json({
                message: token
            });

        } catch (error: any) {
            return res.status(404).json({
                message: "Erro ao logar",
                error: error.message
            });
        }
    }
}