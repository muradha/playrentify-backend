import { Module } from "@nestjs/common";
import { RolesController } from "./roles.controller";
import { RolesService } from "./roles.service";
import { PrismaModule } from "nestjs-prisma";
import { CoreModule } from "src/core/core.module";
import { RolesRepository } from "./roles.repository";

@Module({
    imports: [PrismaModule, CoreModule],
    controllers: [RolesController],
    providers: [RolesService, RolesRepository]
})

export class RolesModule { }