import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { RentalSessionService } from './rental-session.service';
import {
  CreateRentalSessionDto,
  UpdateRentalSessionDto,
} from './rental-session.validation';
import { HttpResponseProvider } from 'src/core/core.module';

@Controller('units')
export class RentalSessionController {
  constructor(
    private rentalSessionService: RentalSessionService,
    private readonly httpResponse: HttpResponseProvider,
  ) {}

  @Get()
  async list() {
    return this.httpResponse.success(
      await this.rentalSessionService.getRentalSessions(),
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const rentalSessions = await this.rentalSessionService.getRentalSession(id);
    if (!rentalSessions) {
      return this.httpResponse.notFound('Rental session Not Found');
    }
    return this.httpResponse.success(rentalSessions, 'Rental session Found');
  }

  @Post()
  async create(@Body() createRentalSessionDto: CreateRentalSessionDto) {
    const rentalSession = await this.rentalSessionService.createRentalSession(
      createRentalSessionDto.status,
      createRentalSessionDto.end_time,
      createRentalSessionDto.user_id,
      createRentalSessionDto.unit_id,
    );
    return this.httpResponse.success(rentalSession, 'Rental session created');
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRentalSessionDto: UpdateRentalSessionDto,
  ) {
    const isExistRentalSession =
      await this.rentalSessionService.getRentalSession(id);
    if (!isExistRentalSession) {
      return this.httpResponse.notFound('Rental session Not Found');
    }
    const rentalSession = await this.rentalSessionService.updateRentalSession(
      id,
      updateRentalSessionDto.status,
      updateRentalSessionDto.end_time,
      updateRentalSessionDto.user_id,
      updateRentalSessionDto.unit_id,
    );
    return this.httpResponse.success(rentalSession, 'Rental Session Updated');
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const isExistRentalSession =
      await this.rentalSessionService.getRentalSession(id);
    if (!isExistRentalSession) {
      return this.httpResponse.notFound('Rental session Not Found');
    }
    return this.httpResponse.success(
      await this.rentalSessionService.deleteRentalSessionById(id),
      'Rental session deleted',
    );
  }
}
