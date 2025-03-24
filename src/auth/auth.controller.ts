import { Body, Controller, Delete, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor ( private authService : AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authDto : AuthDto): Promise<void> {
    return this.authService.signUp(authDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authDto : AuthDto): Promise<{accessToken : string}> {
    return this.authService.signIn(authDto);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id : number) {
    this.authService.deleteUser(id);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log('sdlkfj', req);
  }
}
