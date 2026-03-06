import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service.js";
import { User as UserModel, Prisma } from '../../src/generated/prisma/client.js'
import { CreateUserDto, UpdateUserDto, UserResponseDto } from "./dtos/user.dto.js";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<UserResponseDto | null> {
        const userExists = await this.prisma.user.findUnique({
            where: userWhereUniqueInput
        });

        if (!userExists) {
            throw new NotFoundException(`User not found`);
        }

        return userExists;
    }

    async getUsers(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<UserResponseDto[] | null> {
        const { skip, take, cursor, where, orderBy } = params;

        return this.prisma.user.findMany({
            skip, take, cursor, where, orderBy
        });
    }

    async createUser(data: CreateUserDto): Promise<UserResponseDto> {
        return this.prisma.user.create({
            data
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<UserResponseDto> {
        return this.prisma.user.delete({
            where
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: UpdateUserDto;
    }): Promise<UserResponseDto> {
        const { where, data } = params
        return this.prisma.user.update({
            data, where
        })
    }

    async findOne(username: string): Promise<UserResponseDto | null> {
        return this.prisma.user.findUnique({ where: { username } });
    }

}