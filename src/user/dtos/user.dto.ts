export class CreateUserDto {
    name: string;
    username: string;
    email: string;
    password: string;
}

export class UpdateUserDto {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
}

export class UserResponseDto {
    id: string;
    email: string;
    name: string;
    username: string;
    createdAt: Date;
}