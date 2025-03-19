import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCreateDto } from './dto/auth-create.dto';

@Controller('auth')
export class AuthController {
  constructor ( private authService : AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCreateDto : AuthCreateDto): Promise<void> {
    return this.authService.signUp(authCreateDto);
  }

}
