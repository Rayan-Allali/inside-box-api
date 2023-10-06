/* eslint-disable prettier/prettier */
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsNumber()
  age: number;
}
