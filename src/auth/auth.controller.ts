import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginDto, SignUpDto } from './auth.validation';
import { AuthService } from './auth.service';
import { HttpResponseProvider } from 'src/common/http-response.provider';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private readonly httpResponse: HttpResponseProvider
    ) { }

    @Public()
    @Post('login')
    async login(@Body() body: LoginDto) {
        return this.httpResponse.success(await this.authService.signIn(body.email, body.password));
    }

    @Public()
    @Post('register')
    async signUp(@Body() body: SignUpDto) {
        return this.httpResponse.success(await this.authService.signUp(body.username, body.email, body.password));
    }

    @Public()
    @Post('refresh')
    async refreshToken(@Body() body: { refresh_token: string }) {
        return this.httpResponse.success(await this.authService.generateAccessToken(body.refresh_token));
    }
}
