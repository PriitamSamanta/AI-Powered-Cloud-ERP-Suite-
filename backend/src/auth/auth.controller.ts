import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseGuards, Get, Req } from '@nestjs/common';
import { JwtAuthGuard } from './jwt.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body.email, body.password);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: any) {
    return {
      message: 'Protected route accessed',
      user: req.user,
    };
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  getAdminData() {
    return { message: 'Admin only data' };
  }
}
