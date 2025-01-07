import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) { }

    async getUsers() {
        return await this.prisma.user.findMany()
    }

    async getUser(id: number) {
        return await this.prisma.user.findUnique({ where: { id } });
    }

    async getUserByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } });
    }

    async findOne(email: string){
        return await this.prisma.user.findUnique({ where: { email } });
    }

    async saveUser(name: string, email: string, password: string) {
        return await this.prisma.user.create({ data: { name, email, password } });
    }

    async updateUser(id: number, name: string, email: string, password: string) {
        return await this.prisma.user.update({ where: { id }, data: { name, email, password } });
    }

    async deleteUserById(id: number) {
        return await this.prisma.user.delete({ where: { id } });
    }
}