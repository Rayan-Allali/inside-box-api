/* eslint-disable prettier/prettier */
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authServ: AuthService) {}

  @Post('/signIn')
  async studentSignIn(@Body() credential: SignInDto) {
    try {
      const token = await this.authServ.GlobalSignIn(credential);
      if (token === 0) {
        return new BadRequestException('Email not found');
      } else if (token === 1) {
        return new BadRequestException('wrong password');
      }
      return token;
    } catch (err) {
      throw new Error('an error occurred while signing in' + err.message);
    }
  }
}
