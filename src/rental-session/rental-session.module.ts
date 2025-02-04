import { Module } from "@nestjs/common";
import { RentalSessionController } from "./rental-session.controller";
import { RentalSessionService } from "./rental-session.service";
import { RentalSessionRepository } from "./rental-session.repository";
import { PrismaModule } from "nestjs-prisma";
import { CoreModule } from "src/core/core.module";

@Module({
    imports: [PrismaModule, CoreModule],
    controllers: [RentalSessionController],
    providers: [RentalSessionService, RentalSessionRepository]
})

export class RentalSessionModule { }