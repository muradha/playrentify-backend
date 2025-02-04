import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthModule, UsersModule, CoreModule, RolesModule, AuthGuard, UnitsModule, RentalSessionModule } from './modules';

@Module({
  imports: [CoreModule, UnitsModule, UsersModule, AuthModule, RolesModule, RentalSessionModule],
  controllers: [AppController],
  providers: [AppService,
    providePrismaClientExceptionFilter(),
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard
    }
  ]
})
export class AppModule { } 
