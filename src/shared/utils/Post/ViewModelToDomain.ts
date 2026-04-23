import { PostViewModel } from "../../../application/ViewModel/PostViewModel";
import { Post } from "../../../domain/entities/Post";

export class ViewModelToDomain {
  static toDomain(viewModel: PostViewModel): Post {
    var domain = new Post();

    domain.id = viewModel.id;
    domain.titulo = viewModel.titulo;
    domain.conteudo = viewModel.conteudo;
    domain.autorId = viewModel.autorId;
    domain.likesCount = viewModel.likesCount ?? 0;
    domain.dataAtualizacao = viewModel.dataAlteracao;
    
    return domain;
  }
}