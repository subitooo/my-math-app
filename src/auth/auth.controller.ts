import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AccessTokenGuard } from "./access-token.guard";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(
        @Body() body: { login: string; password: string }
    ) {
        return this.authService.login(body.login, body.password);
    }

    @Post('refresh')
    async refresh(
        @Body() body: { refreshToken: string }
    ) {
        return this.authService.refresh(body.refreshToken);
    }

    @UseGuards(AccessTokenGuard)
    @Post('logout')
    logout(@Req() req: any) {
        return this.authService.logout(req.user);
    }

    @UseGuards(AccessTokenGuard)
    @Get('me')
    me(@Req() req: any) {
        return this.authService.getMe(req.user);
    }
}