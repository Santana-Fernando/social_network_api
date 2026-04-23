export interface ILike {
    like(autorId: number, postId: number): Promise<void>
    deslike(autorId: number, postId: number): Promise<void>
}