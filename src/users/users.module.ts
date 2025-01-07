import { Module } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { PrismaModule } from "nestjs-prisma";
import { CoreModule } from "src/core/core.module";

@Module({
    imports: [PrismaModule, CoreModule],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository]
})

export class UsersModule { } 