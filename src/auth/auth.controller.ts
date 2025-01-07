import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDto, SignUpDto } from './auth.validation';
import { AuthService } from './auth.service';
import { HttpResponseProvider } from 'src/common/http-response.provider';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly httpResponse: HttpResponseProvider
    ) { }

    @Post('login')
    async login(@Body() body: LoginDto) {
        return this.authService.signIn(body.email, body.password);
    }

    @Post('register')
    async signUp(@Body() body: SignUpDto) {
        return this.authService.signUp(body.username, body.email, body.password);
    }
}
