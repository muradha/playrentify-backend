import { Module } from "@nestjs/common";
import { UnitsController } from "./units.controller";
import { UnitsService } from "./units.service";
import { UnitsRepository } from "./units.repository";
import { PrismaModule } from "nestjs-prisma";
import { CoreModule } from "src/core/core.module";

@Module({
    imports: [PrismaModule, CoreModule],
    controllers: [UnitsController],
    providers: [UnitsService, UnitsRepository]
})

export class UnitsModule { }