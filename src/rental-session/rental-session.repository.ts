import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RentalSessionStatus } from '@prisma/client';

@Injectable()
export class RentalSessionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getRentalSessions() {
    return await this.prisma.rentalSession.findMany();
  }

  async getRentalSession(id: number) {
    return await this.prisma.rentalSession.findUnique({ where: { id } });
  }

  async saveRentalSession(
    status: RentalSessionStatus,
    endTime: Date,
    userId: number,
    unitId: number,
  ) {
    return await this.prisma.rentalSession.create({
      data: { status, end_time: endTime, user_id: userId, unit_id: unitId },
    });
  }

  async updateRentalSession(
    id: number,
    status: RentalSessionStatus,
    endTime: Date,
    userId: number,
    unitId: number,
  ) {
    return await this.prisma.rentalSession.update({
      where: { id },
      data: { status, end_time: endTime, user_id: userId, unit_id: unitId },
    });
  }

  async deleteRentalSessionById(id: number) {
    return await this.prisma.rentalSession.delete({ where: { id } });
  }
}
