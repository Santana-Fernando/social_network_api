
import { injectable, inject } from "tsyringe";
import { IUsuarioService } from '../interface/IUsuarioService'
import { UsuarioViewModel } from '../ViewModel/UsuarioViewModel';
import { IUsuario } from '../../domain/interface/IUsuario'

import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { ViewModelToDomain } from "../../shared/utils/Usuario/ViewModelToDomain"

@injectable()
export class UsuarioService implements IUsuarioService {

    constructor(
        @inject("IUsuario")
        private usuarioRepository: IUsuario
    ) {}

    async insert(usuario: UsuarioViewModel): Promise<void> {
        try {
            await this.verifyErrors(usuario);

            var usuarioDomain = ViewModelToDomain.toDomain(usuario);

            await this.usuarioRepository.insert(usuarioDomain)
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao criar usuário');
        }
    }

    private async verifyErrors(usuario: UsuarioViewModel) {
        const viewModel = plainToInstance(UsuarioViewModel, usuario);

        const erros = await validate(viewModel);

        if (erros.length > 0) {
            throw new Error(JSON.stringify(erros));
        }
    }
}