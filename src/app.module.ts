import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { HttpResponseProvider } from './common/http-response.provider';
import { PrismaModule, providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, HttpResponseProvider,
    providePrismaClientExceptionFilter(),
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ]
})
export class AppModule { }
