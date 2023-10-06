/* eslint-disable prettier/prettier */
import { IsEmail, IsString } from 'class-validator';

export class CreateTrainerDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
}