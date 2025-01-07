import { Injectable } from "@nestjs/common";
import { UnitStatus, Unit } from "@prisma/client";
import { UnitsRepository } from "./units.repository";

@Injectable()
export class UnitsService {
    constructor(private readonly unitsRepository: UnitsRepository) { }

    async getUnits(): Promise<Unit[]> {
        return await this.unitsRepository.getUnits();
    }

    async getUnit(id: number): Promise<Unit | null> {
        return await this.unitsRepository.getUnit(id);
    }

    async saveUnit(name: string, status: UnitStatus): Promise<Unit> {
        return await this.unitsRepository.saveUnit(name, status);
    }

    async updateUnit(id: number, name: string, status: UnitStatus): Promise<Unit> {
        return await this.unitsRepository.updateUnit(id, name, status);
    }

    async deleteUnitById(id: number): Promise<Unit> {
        return await this.unitsRepository.deleteUnitById(id);
    }
}