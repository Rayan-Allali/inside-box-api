import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async GetAll(): Promise<Student[]> {
    try {
      const students = await this.studentRepository.find();
      return students;
    } catch (err) {
      console.error(err);
      throw new Error('failed to get all students ' + err.message);
    }
  }

  async GetOne(studentId: number): Promise<Student | null> {
    try {
      const student = await this.studentRepository.findOne({
        where: {
          id: studentId,
        },
      });
      if (!student) {
        return null;
      }
      return student;
    } catch (err) {
      console.error(err);
      throw new Error('failed to get the student ' + err.message);
    }
  }

  async Update(
    studentId: number,
    newStudent: CreateStudentDto,
  ): Promise<Student | null> {
    try {
      const student = await this.studentRepository.findOne({
        where: {
          id: studentId,
        },
      });
      if (!student) {
        return null;
      }
      const savedStudent = await this.studentRepository.save(newStudent);
      return savedStudent;
    } catch (err) {
      console.error(err);
      throw new Error('failed to update the student ' + err.message);
    }
  }

  async Delete(id: number): Promise<Student | null> {
    try {
      const student = await this.studentRepository.findOne({ where: { id } });
      if (!student) return null;
      await this.studentRepository.remove(student);
      return student;
    } catch (err) {
      console.error(err);
      throw new Error('failed to delete student ' + err.message);
    }
  }

  async Create(newStudent: CreateStudentDto): Promise<Student> {
    try {
      const student = await this.studentRepository.create(newStudent);
      const savedStudent = await this.studentRepository.save(student);
      return savedStudent;
    } catch (err) {
      console.error(err);
      throw new Error('failed to create student ' + err.message);
    }
  }
}
