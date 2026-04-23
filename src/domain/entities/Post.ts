export class Post {
    public id!: number;
    public titulo!: string;
    public conteudo!: string;
    public autorId!: number;
    public likesCount!: number;
    public dataCadastro!: Date;
    public dataAtualizacao?: Date;
}