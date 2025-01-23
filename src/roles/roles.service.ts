import { Role } from "@prisma/client";
import { RolesRepository } from "./roles.repository";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class RolesService {
    constructor(private readonly rolesRepository: RolesRepository) { }

    async createRole(name: string): Promise<Role> {
        return await this.rolesRepository.saveRole(name);
    }

    async deleteRoleById(id: number): Promise<Role> {
        const role = await this.rolesRepository.getRoleById(id);
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return await this.rolesRepository.deleteRoleById(id);
    }

    async getRoles(): Promise<Role[]> {
        return await this.rolesRepository.getRoles();
    }

    async updateRoleById(id: number, name: string): Promise<Role> {
        const role = await this.rolesRepository.getRoleById(id);
        if (!role) {
            throw new NotFoundException('Role not found');
        }
        return await this.rolesRepository.updateRoleById(id, name);
    }

    async getRoleById(id: number): Promise<Role | null> {
        return await this.rolesRepository.getRoleById(id);
    }
}