/* eslint-disable prettier/prettier */
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;
  
  @IsNumber()
  age: number;

  @IsString()
  gender: string;

  @IsString()
  address: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  parentNumber: string;
}
