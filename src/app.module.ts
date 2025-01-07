import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpResponseProvider } from './common/http-response.provider';
import { providePrismaClientExceptionFilter } from 'nestjs-prisma';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { UnitsModule } from './units/units.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, UnitsModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,
    providePrismaClientExceptionFilter(),
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ]
})
export class AppModule { } 
