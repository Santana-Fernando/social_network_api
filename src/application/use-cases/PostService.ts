import { injectable, inject } from "tsyringe";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

import { IPost } from "../../domain/interface/IPost";
import { IPostService } from "../interface/IPostService";
import { PostViewModel } from "../ViewModel/PostViewModel";
import { ViewModelToDomain } from "../../shared/utils/Post/ViewModelToDomain";

@injectable()
export class PostService implements IPostService {

    constructor(
        @inject("IPost")
        private postRepository: IPost
    ) {}

    async insert(post: PostViewModel): Promise<void> {
        try {
            await this.verifyErrors(post);

            var postDomain = ViewModelToDomain.toDomain(post);
            
            console.log(postDomain)
            await this.postRepository.insert(postDomain)
        } catch (error: any) {
            throw new Error(error.message || 'Erro ao criar post');
        }
    }

    private async verifyErrors(post: PostViewModel) {
        const viewModel = plainToInstance(PostViewModel, post);

        const erros = await validate(viewModel);

        if (erros.length > 0) {
            throw new Error(JSON.stringify(erros));
        }
    }
}