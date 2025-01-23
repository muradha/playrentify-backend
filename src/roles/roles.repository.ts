import { PrismaService } from "nestjs-prisma";
import { Role } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { HttpResponseProvider } from "src/common/http-response.provider";

@Injectable()
export class RolesRepository {
    constructor(private readonly prisma: PrismaService) { }

    async saveRole(name: string): Promise<Role> {
        return await this.prisma.role.create({ data: { name } });
    }

    async deleteRoleById(id: number): Promise<Role> {
        return await this.prisma.role.delete({ where: { id } });
    }

    async getRoles(): Promise<Role[]> {
        return await this.prisma.role.findMany();
    }

    async getRoleById(id: number): Promise<Role | null> {
        return await this.prisma.role.findUnique({ where: { id } });
    }

    async updateRoleById(id: number, name: string): Promise<Role> {
        return await this.prisma.role.update({ where: { id }, data: { name } });
    }
}