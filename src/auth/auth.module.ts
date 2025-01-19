import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "nestjs-prisma";
import { UsersRepository } from "src/users/users.repository";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { CoreModule } from "src/core/core.module";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [PrismaModule, CoreModule, ConfigModule.forRoot({
        isGlobal: true, // Jadikan ConfigModule global
    }), JwtModule.registerAsync({
        global: true,
        useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '60s' },
        }),
        inject: [ConfigService], // Inject ConfigService ke useFactory
    }),],
    controllers: [AuthController],
    providers: [AuthService, UsersRepository, JwtService],
    exports: [AuthService]
})

export class AuthModule { }