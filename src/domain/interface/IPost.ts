import { Post } from "../entities/Post";

export interface IPost {
    insert(post: Post): Promise<void>;
    findAll(): Promise<Post[]>
    findById(id: number): Promise<Post | null>
    findTopLiked(): Promise<Post[]> 
    delete(id: number): Promise<void>
    update(post: Post): Promise<void>
}