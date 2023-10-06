import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthService } from '../auth/auth.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { SignInDto } from '../auth/dto/signIn.dto';
import { Admin } from './admin.entity';

@Controller('admins')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
  ) {}

  @Get()
  async getAdmins(): Promise<Admin[]> {
    try {
      const admins = await this.adminService.GetAll();
      return admins;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to get all Admins',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('/:id')
  async getAdmin(@Param('id') id: number) {
    try {
      const Admin = await this.adminService.GetOne(id);
      if (!Admin) {
        return new NotFoundException();
      }
      return Admin;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to get Admin',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/:id')
  async updateAdmin(@Param('id') id: number, @Body() newAdmin: CreateAdminDto) {
    try {
      const Admin = await this.adminService.Update(id, newAdmin);
      if (!Admin) {
        return new NotFoundException();
      }
      return Admin;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to update Admin',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteAdmin(@Param('id') id: number) {
    try {
      const Admin = await this.adminService.Delete(id);
      if (!Admin) {
        return new NotFoundException();
      }
      return null;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to delete Admin',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @HttpCode(201)
  async createAdmin(@Body() newAdmin: CreateAdminDto) {
    try {
      const Admin = await this.adminService.Create(newAdmin);
      if (!Admin) {
        return new BadRequestException('there is a user with that email');
      }
      return Admin;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to create Admin',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/signIn')
  @HttpCode(201)
  async SignIn(@Body() credintial: SignInDto) {
    try {
      const token = await this.authService.AdminSignIn(credintial);
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
