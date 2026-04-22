export class Usuario {
  

  public readonly id!: number;
  public nome!: string;
  public email!: string;
  public nick!: string;
  public senha!: string;
  public readonly dataCadastro!: Date;
  public dataAlteracao?: Date;
}