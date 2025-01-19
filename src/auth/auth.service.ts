import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { HttpResponseProvider } from 'src/common/http-response.provider';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
        private readonly httpResponse: HttpResponseProvider,
        private configService: ConfigService
    ) { }

    async signIn(email: string, password: string) {
        const user = await this.usersRepository.getUserByEmail(email);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        if (user && await bcrypt.compare(password, user.password)) {
            const payload = { sub: user.id, email: user.email };
            return this.httpResponse.success({
                access_token: await this.jwtService.signAsync(payload, { secret: this.configService.get<string>('JWT_SECRET') }),
            });
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
        return this.httpResponse.success(createdUser, 'Registered Successfully');
    }
}
