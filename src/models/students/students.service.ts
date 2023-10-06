import { hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { generatePassword } from 'src/utils/randomPasswordGenerator';
import { sendMail } from 'src/utils/sendEmail';

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
      const randomPassword = generatePassword(12);
      student.password = await hash(randomPassword, 10);
      console.log(randomPassword);
      console.log(student.password);
      const emailText =
        `Dear ${student.name},\n\n` +
        `Your account at keyBox.dz has been created successfully. Here are your account details:\n\n` +
        `Username/Email: ${student.email}\n` +
        `Password: ${randomPassword}\n\n` +
        `Please use these credentials to log in. Make sure to change your password after the first login for security reasons.\n\n` +
        `Best regards,\n`;
      //   + `${admin.name} (${admin.email})`;

    //   const emailSubject = 'Your KeyBox.dz Account Has Been Created';
    //   try {
    //     await sendMail({
    //       email: student.email,
    //       text: `${emailText}`,
    //       subject: emailSubject,
    //     });
    //   } catch (err) {
    //     throw new Error('failed to send account to user' + err.message);
    //   }
      const savedStudent = await this.studentRepository.save(student);
      savedStudent.password = undefined;
      return savedStudent;
    } catch (err) {
      console.error(err);
      throw new Error('failed to create student ' + err.message);
    }
  }
}
