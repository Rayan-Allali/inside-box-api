/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './jwt-payload.interface.payload';
import { Student } from '../students/student.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
  ) {
    super({
      secretOrKey: process.env.myJWTSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      expiresIn: '1000h',
    });
  }

  async validate(payload: JwtPayload): Promise<Student> {
    const { id, email } = payload;
    const Student: Student = await this.studentRepo.findOneBy({ id, email });
    if (!Student) throw new UnauthorizedException('not authenthicated');
    return Student;
  }
}
