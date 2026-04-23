import { PostViewModel } from "../ViewModel/PostViewModel";

export interface IPostService {
    insert(post: PostViewModel): Promise<void>;
}