import { Usuario } from "../../../domain/entities/Usuario";
import { IUsuario } from "../../../domain/interface/IUsuario";
import { EntityToDomain } from "../../../shared/utils/Usuario/EntityToDomain";
import { AppDataSource } from "../data-source";
import { UsuarioEntity } from "../entities/UsuarioEntity";
import { Repository } from "typeorm";

export class UsuarioRepository implements IUsuario {

    constructor(private readonly repo: Repository<UsuarioEntity>) {}
    
    async insert(usuario: Usuario): Promise<void> {
        const repo = AppDataSource.getRepository(UsuarioEntity);

        const entity = repo.create({
            nome: usuario.nome,
            email: usuario.email,
            nick: usuario.nick,
            senha: usuario.senha
        });

        await repo.save(entity);
    }

    async findByEmail(email: string): Promise<Usuario | null> {
        const entity = await this.repo.findOne({
        where: { email }
        });

        if (!entity) return null;

        return EntityToDomain.toDomain(entity);
    }

}