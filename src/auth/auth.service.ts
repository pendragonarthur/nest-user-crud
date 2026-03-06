import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service.js";
import { SignInDto, SignUpDto } from "./dtos/auth.dto.js";
import { UserService } from "src/user/user.service.js";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,
        private userService: UserService
    ) { };



}