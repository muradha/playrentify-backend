import { Injectable } from "@nestjs/common";
import { PrismaService } from "nestjs-prisma";

@Injectable()
export class AuthRepository {
    constructor(private readonly prisma: PrismaService) { }

    async saveRefreshToken(userId: number, refreshToken: string, expiresAt: Date) {
        return await this.prisma.loginSession.create({
            data: { refresh_token: refreshToken, user_id: userId, expires_at: expiresAt },
        });
    }

    async updateRefreshToken(userId: number, refreshToken: string, expiresAt: Date) {
        return await this.prisma.loginSession.update({
            where: { id: userId },
            data: { refresh_token: refreshToken, expires_at: expiresAt },
        });
    }
}   