import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { UserService } from "./user.service.js";
import { UserResponseDto } from "./dtos/user.dto.js";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }
}