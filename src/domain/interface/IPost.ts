import { Post } from "../entities/Post";

export interface IPost {
    insert(post: Post): Promise<void>;
}