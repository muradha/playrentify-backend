import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async getUsers() {
        return await this.prisma.user.findMany()
    }

    async getUser(id: number) {
        return await this.prisma.user.findUnique({ where: { id } });
    }

    async saveUser(name: string, email: string, password: string) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return await this.prisma.user.create({ data: { name, email, password: hash } });
    }

    async updateUser(id: number, name: string, email: string, password: string) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return await this.prisma.user.update({ where: { id }, data: { name, email, password: hash } });
    }

    async deleteUserById(id: number) {
        return await this.prisma.user.delete({ where: { id } });
    }
}