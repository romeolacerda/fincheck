import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SinginDto } from './dtos/signin.dto';
import { SignupDto } from './dtos/singup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  authenticate(@Body() SinginDto: SinginDto){
    return this.authService.singin(SinginDto);
  }

 
  @Post('signup')
  singup(@Body() SignupDto: SignupDto) {
    return this.authService.singUp(SignupDto);
  }
}
