/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;
  @IsString()
  email: string;
  @IsNumber()
  age: number;
}
