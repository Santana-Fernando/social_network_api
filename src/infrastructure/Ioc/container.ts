import { container } from "tsyringe";

import { IUsuario } from "../../domain/interface/IUsuario";
import { IUsuarioService } from "../../application/interface/IUsuarioService";

import { UsuarioRepository } from "../database/repositories/UsuarioRepository";
import { UsuarioService } from "../../application/use-cases/UsuarioService";

import { AppDataSource } from "../database/data-source";
import { UsuarioEntity } from "../database/entities/UsuarioEntity";

// TypeORM repo
const typeOrmRepo = AppDataSource.getRepository(UsuarioEntity);

// Repository
container.register<IUsuario>("IUsuario", {
  useValue: new UsuarioRepository(typeOrmRepo),
});

// Service
container.register<IUsuarioService>("IUsuarioService", {
  useClass: UsuarioService,
});