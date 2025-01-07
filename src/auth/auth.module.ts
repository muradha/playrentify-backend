import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "nestjs-prisma";
import { UsersRepository } from "src/users/users.repository";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { CoreModule } from "src/core/core.module";

@Module({
    imports: [PrismaModule, CoreModule, JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60s' },
    }),],
    controllers: [AuthController],
    providers: [AuthService, UsersRepository, JwtService],
    exports: [AuthService]
})

export class AuthModule { }