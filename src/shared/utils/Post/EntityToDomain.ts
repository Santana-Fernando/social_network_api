import { PostEntity } from "../../../infrastructure/database/entities/PostEntity";
import { Post } from "../../../domain/entities/Post";

export class EntityToDomain {
  static toPost(entity: PostEntity): Post {
    
    var domain = new Post();

    domain.id = entity.id,
    domain.titulo = entity.titulo,
    domain.conteudo = entity.conteudo,
    domain.autorId = entity.autor_id,
    domain.likesCount = entity.likes_count,
    domain.dataCadastro = entity.data_cadastro,
    domain.dataAtualizacao = entity.data_atualizacao

    return domain;
  }
}