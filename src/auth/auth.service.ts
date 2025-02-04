import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HttpResponseProvider } from 'src/common/http-response.provider';
import { UsersRepository } from 'src/users/users.repository';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const refreshToken = await this.authRepository.getRefreshTokenByUserId(
      user.id,
    );

    if (refreshToken && refreshToken.expires_at < new Date()) {
      await this.authRepository.deleteRefreshTokenByUserId(user.id);
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { sub: user.id, email: user.email };
      const access_token = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '60s',
      });
      const generatedRefreshtoken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '7d',
      });
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

      if (refreshToken) {
        await this.authRepository.updateRefreshToken(
          user.id,
          generatedRefreshtoken,
          expiresAt,
        );
      } else {
        await this.authRepository.saveRefreshToken(
          user.id,
          generatedRefreshtoken,
          expiresAt,
        );
      }

      return { access_token, generatedRefreshtoken };
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async signUp(name: string, email: string, password: string) {
    const user = await this.usersRepository.getUserByEmail(email);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
      // return this.httpResponse.error('User already exists', 409);
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const createdUser = await this.usersRepository.saveUser(name, email, hash);
    return createdUser;
  }

  async generateAccessToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      const userId = decoded.sub;
      const user = await this.usersRepository.getUser(userId);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const payload = { sub: userId, email: user.email };
      const generatedAccessToken = await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '24h',
      });

      return {
        access_token: generatedAccessToken,
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new HttpException(
          'Refresh token expired',
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (error instanceof JsonWebTokenError) {
        throw new HttpException(
          'Invalid refresh token',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }
}
