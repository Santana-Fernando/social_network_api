import { container } from "tsyringe";

import { IUsuario } from "../../domain/interface/IUsuario";
import { IUsuarioService } from "../../application/interface/IUsuarioService";

import { UsuarioRepository } from "../database/repositories/UsuarioRepository";
import { UsuarioService } from "../../application/use-cases/UsuarioService";

import { AppDataSource } from "../database/data-source";
import { UsuarioEntity } from "../database/entities/UsuarioEntity";
import { PostRepository } from "../database/repositories/PostRepository";
import { IPost } from "../../domain/interface/IPost";
import { PostEntity } from "../database/entities/PostEntity";
import { IPostService } from "../../application/interface/IPostService";
import { PostService } from "../../application/use-cases/PostService";
import { ILike } from "../../domain/interface/ILike";
import { LikeRepository } from "../database/repositories/LikeRepository";
import { LikeEntity } from "../database/entities/LikeEntity";
import { ILikeService } from "../../application/interface/ILikeService";
import { LikeService } from "../../application/use-cases/LikeService";

const typeOrmRepoUser = AppDataSource.getRepository(UsuarioEntity);
const typeOrmRepoPost = AppDataSource.getRepository(PostEntity);
const typeOrmRepoLike = AppDataSource.getRepository(LikeEntity);

container.register<IUsuario>("IUsuario", {
  useValue: new UsuarioRepository(typeOrmRepoUser),
});

container.register<IUsuarioService>("IUsuarioService", {
  useClass: UsuarioService,
});

container.register<IPost>("IPost", {
  useValue: new PostRepository(typeOrmRepoPost),
});

container.register<IPostService>("IPostService", {
  useClass: PostService,
});

container.register<ILike>("ILike", {
  useValue: new LikeRepository(typeOrmRepoLike),
});

container.register<ILikeService>("ILikeService", {
  useClass: LikeService,
});