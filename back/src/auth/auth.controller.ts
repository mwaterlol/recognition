import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entity/auth.entity';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login to platform' })
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register to platform' })
  @ApiOkResponse({ type: AuthEntity })
  register(@Body() { email, password, username }: RegisterDto) {
    return this.authService.register(email, password, username);
  }

  @Get('test')
  @ApiOkResponse({ type: AuthEntity })
  test() {
    return { value: 'test tesponse' };
  }
}
