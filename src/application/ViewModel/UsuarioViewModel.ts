import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches
} from "class-validator";
import { ValidatePassword } from "../../shared/utils/ValidatePassword";

export class UsuarioViewModel {
  id!: number;
  
  @IsNotEmpty({ message: "Nome é obrigatório" })
  nome!: string;

  @IsEmail({}, { message: "Email inválido" })
  email!: string;

  @IsNotEmpty({ message: "Nick é obrigatório" })
  nick!: string;

  @MinLength(6, { message: "Senha deve ter no mínimo 6 caracteres" })
  senha!: string;

  dataCadastro!: Date;

  @MinLength(6, { message: "Confirmação deve ter no mínimo 6 caracteres" })
  @ValidatePassword("senha", { message: "As senhas não coincidem" })
  confirmacaoSenha!: string;
}