import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { JwtAuthGuard } from '@common/guards';
import { RequestExtend } from '@common/interfaces/user-request';
import { ForgotAuthDto } from '../dto/forgot-auth.dto';
import { ResetPasswordAuthDto } from '../models/reset-password-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.login(createAuthDto);
  }

  @Post('forgot')
  forgot(@Body() forgotAuthDto: ForgotAuthDto) {
    return this.authService.forgot(forgotAuthDto);
  }

  @Post('reset')
  resetPassword(@Body() resetPasswordAuthDto: ResetPasswordAuthDto) {
    return this.authService.resetPassword(resetPasswordAuthDto);
  }

  @Get('session')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  check(@Req() { user }: RequestExtend) {
    return this.authService.refresh(user.id);
  }
}
