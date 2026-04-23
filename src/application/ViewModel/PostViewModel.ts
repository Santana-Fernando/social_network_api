import {
  IsNotEmpty
} from "class-validator";

export class PostViewModel {
    public readonly id!: number;

    @IsNotEmpty({ message: "Informe um título" })
    public titulo!: string;

    @IsNotEmpty({ message: "Diga o que está pensando" })
    public conteudo!: string;

    public autorId!: number;
    
    public likesCount!: number;
    
    public readonly dataCadastro!: Date;
    
    public dataAlteracao?: Date;
}