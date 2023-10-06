/* eslint-disable prettier/prettier */
import { IsEmail, IsString } from 'class-validator';

export class CreateAdminDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
}