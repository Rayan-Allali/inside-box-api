/* eslint-disable prettier/prettier */
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
  UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StudentsService } from './students.service';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { SignInDto } from '../auth/dto/signIn.dto';
import { AuthService } from '../auth/auth.service';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('students')
export class StudentsController {
  constructor(
    private studentService: StudentsService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getStudents(): Promise<Student[]> {
    try {
      const students = await this.studentService.GetAll();
      return students;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to get all students',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  async getStudent(@Param('id') id: number) {
    try {
      const student = await this.studentService.GetOne(id);
      if (!student) {
        return new NotFoundException();
      }
      return student;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to get student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateStudent(
    @Param('id') id: number,
    @Body() newStudent: CreateStudentDto,
  ) {
    try {
      const student = await this.studentService.Update(id, newStudent);
      if (!student) {
        return new NotFoundException();
      }
      return student;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to update student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  @HttpCode(204)
  // @UseGuards(AuthGuard('jwt'))
  // @Roles('Admin')
  async deleteStudent(@Param('id') id: number) {
    try {
      const student = await this.studentService.Delete(id);
      if (!student) {
        return new NotFoundException();
      }
      return null;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to delete student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @HttpCode(201)
  @Roles('Admin')
  @UseGuards(AuthGuard('jwt'),RolesGuard)
 
  async createStudent(@Body() newStudent: CreateStudentDto) {
    try {
      const student = await this.studentService.Create(newStudent);
      if (!student) {
        return new BadRequestException('there is a user with that email');
      }
      return student;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to create student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/signIn')
  @HttpCode(201)
  async SignIn(@Body() credintial: SignInDto) {
    try {
      const token = await this.authService.StudentSignIn(credintial);
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
