import { Usuario } from "../../../domain/entities/Usuario";
import { UsuarioEntity } from "../../../infrastructure/database/entities/UsuarioEntity";

export class EntityToDomain {
  static toDomain(entity: UsuarioEntity): Usuario {
    return {
      id: entity.id,
      nome: entity.nome,
      email: entity.email,
      nick: entity.nick,
      senha: entity.senha,
      dataCadastro: entity.dataCadastro,
      dataAlteracao: entity.dataAlteracao
    };
  }
}