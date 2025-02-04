import { Injectable } from '@nestjs/common';
import { RentalSessionStatus, RentalSession } from '@prisma/client';
import { RentalSessionRepository } from './rental-session.repository';

@Injectable()
export class RentalSessionService {
  constructor(
    private readonly rentalSessionRepository: RentalSessionRepository,
  ) {}

  async getRentalSessions(): Promise<RentalSession[]> {
    return await this.rentalSessionRepository.getRentalSessions();
  }

  async getRentalSession(id: number): Promise<RentalSession | null> {
    return await this.rentalSessionRepository.getRentalSession(id);
  }

  async createRentalSession(
    status: RentalSessionStatus,
    endTime: Date,
    userId: number,
    unitId: number,
  ): Promise<RentalSession> {
    return await this.rentalSessionRepository.saveRentalSession(
      status,
      endTime,
      userId,
      unitId,
    );
  }

  async updateRentalSession(
    id: number,
    status: RentalSessionStatus,
    endTime: Date,
    userId: number,
    unitId: number,
  ): Promise<RentalSession> {
    return await this.rentalSessionRepository.updateRentalSession(
      id,
      status,
      endTime,
      userId,
      unitId,
    );
  }

  async deleteRentalSessionById(id: number): Promise<RentalSession> {
    return await this.rentalSessionRepository.deleteRentalSessionById(id);
  }
}
