import {
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
import { StudentsService } from './students.service';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private studentService: StudentsService) {}

  @Get()
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
  async createStudent(@Body() newStudent: CreateStudentDto) {
    try {
      const student = await this.studentService.Create(newStudent);
      return student;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to delete student',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
