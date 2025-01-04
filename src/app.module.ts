import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { HttpResponseProvider } from './common/http-response.provider';
import { PrismaModule, providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { UnitsController } from './units/units.controller';
import { UnitsService } from './units/units.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, UsersController, UnitsController, AuthController],
  providers: [AppService, UsersService, UnitsService, HttpResponseProvider,
    providePrismaClientExceptionFilter(),
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ]
})
export class AppModule { }
