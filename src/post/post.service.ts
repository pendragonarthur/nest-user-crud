import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service.js";
import { Post as PostModel, Prisma } from '../generated/prisma/client.js'
import { CreatePostDto, UpdatePostDto, PostResponseDto } from "./dtos/post.dto.js";

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) { }

    async getPost(postWhereUniqueInput: Prisma.PostWhereUniqueInput): Promise<PostResponseDto> {
        const postExists = await this.prisma.post.findUnique({
            where: postWhereUniqueInput
        });

        if (!postExists) {
            throw new NotFoundException("Post not found.");
        }

        return postExists;
    }

    async getPosts(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PostWhereUniqueInput;
        where?: Prisma.PostWhereInput;
        orderBy?: Prisma.PostOrderByWithRelationInput;
    }): Promise<PostResponseDto[] | null> {
        const { skip, take, cursor, where, orderBy } = params;
        const posts = await this.prisma.post.findMany({
            skip, take, cursor, where, orderBy
        });
        if (!posts) {
            throw new NotFoundException("Posts not found.")
        }
        return posts
    }

    async createPost(data: CreatePostDto): Promise<PostResponseDto> {
        return this.prisma.post.create({
            data
        });
    }

    async deletePost(where: Prisma.PostWhereUniqueInput): Promise<PostResponseDto> {
        return this.prisma.post.delete({
            where
        });
    }

    async updatePost(params: {
        where: Prisma.PostWhereUniqueInput;
        data: UpdatePostDto;
    }): Promise<PostResponseDto> {
        const { where, data } = params;
        return this.prisma.post.update({
            where, data
        });
    }
}