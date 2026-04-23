import { PostViewModel } from "../../../application/ViewModel/PostViewModel";
import { Post } from "../../../domain/entities/Post";

export class DomainToViewModel {
  static toViewModel(post: Post): PostViewModel {
    return {
      id: post.id,
      titulo: post.titulo,
      conteudo: post.conteudo,
      autorId: post.autorId,
      likesCount: post.likesCount,
      dataCadastro: post.dataCadastro
    };
  }
}