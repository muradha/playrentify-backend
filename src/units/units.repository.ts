import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";
import { UnitStatus } from "@prisma/client";

@Injectable()
export class UnitsRepository {
    constructor(private readonly prisma: PrismaService) { }

    async getUnits() {
        return await this.prisma.unit.findMany()
    }

    async getUnit(id: number) {
        return await this.prisma.unit.findUnique({ where: { id } });
    }

    async saveUnit(name: string, status: UnitStatus) {
        return await this.prisma.unit.create({ data: { name, status } });
    }

    async updateUnit(id: number, name: string, status: UnitStatus) {
        return await this.prisma.unit.update({ where: { id }, data: { name, status } });
    }

    async deleteUnitById(id: number) {
        return await this.prisma.unit.delete({ where: { id } });
    }
}