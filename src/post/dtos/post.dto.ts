export class CreatePostDto {
    title: string;
    content: string;
    authorId: string;
}

export class UpdatePostDto {
    title?: string;
    content?: string;
}

export class PostResponseDto {
    title: string;
    content: string;
    id: number;
    createdAt: Date;
    updatedAt?: Date;
}