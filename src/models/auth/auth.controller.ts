import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authServ: AuthService) {}

//   @Post('/studentSignIn')
//   async studentSignIn(@Body() credential: SignInDto) {
//     try {
//     } catch (err) {}
//   }
}
