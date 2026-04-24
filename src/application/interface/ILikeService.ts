export interface ILikeService {
    like(autorId: number, postId: number): Promise<void>;
    deslike(autorId: number, postId: number): Promise<void>;
    consult(postId: number): Promise<number>;
}