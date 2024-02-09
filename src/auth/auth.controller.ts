import { AuthDto } from './dto/auth.dto';
import { AuthService} from './auth.service';
import { Controller, Post, Req, Body, ParseIntPipe } from "@nestjs/common";
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log(dto)
        return this.authService.signup(dto)
    }
    // Post /auth/signin/
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }
}