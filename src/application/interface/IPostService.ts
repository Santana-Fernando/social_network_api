import { PostViewModel } from "../ViewModel/PostViewModel";

export interface IPostService {
    insert(post: PostViewModel): Promise<void>;
    findAll(): Promise<PostViewModel[]>
    findById(id: number): Promise<PostViewModel | null>
    findByAutor(idAutor: number): Promise<PostViewModel[] | null>
    findTopLiked(): Promise<PostViewModel[]> 
    delete(id: number, idAutor: number): Promise<void>
    update(post: PostViewModel): Promise<void>
}