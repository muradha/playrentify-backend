import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    async getUsers() {
        return await this.usersRepository.getUsers();
    }

    async getUser(id: number) {
        return await this.usersRepository.getUser(id);
    }

    async saveUser(name: string, email: string, password: string) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return await this.usersRepository.saveUser(name, email, hash);
    }

    async updateUser(id: number, name: string, email: string, password: string) {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return await this.usersRepository.updateUser(id, name, email, hash);
    }

    async deleteUserById(id: number) {
        return await this.usersRepository.deleteUserById(id);
    }
}