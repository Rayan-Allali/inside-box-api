/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './jwt-payload.interface.payload';
import { Student } from '../students/student.entity';
import { Admin } from '../admin/admin.entity';
import { Trainer } from '../trainer/trainer.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Student) private studentRepo: Repository<Student>,
    @InjectRepository(Admin) private adminRepo: Repository<Admin>,
    @InjectRepository(Trainer) private trainerRepo: Repository<Trainer>
  ) {
    super({
      secretOrKey: process.env.myJWTSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      expiresIn: '1000h',
    });
  }

  async validate(payload: JwtPayload): Promise<Student | Admin | Trainer> {
    const { id, email,role } = payload;
    if(role === "Admin"){
      const admin = await this.adminRepo.findOne({where:{
        email
      }})
      if (!admin) throw new UnauthorizedException('not authenthicated');
      return admin
    }else if(role === "Trainer"){
      const trainer = await this.trainerRepo.findOne({where:{
        email
      }})
      if (!trainer) throw new UnauthorizedException('not authenthicated');
      return trainer
    }else{
      const Student: Student = await this.studentRepo.findOne({where:{
        email
      }});
      if (!Student) throw new UnauthorizedException('not authenthicated');
      return Student;
    }
  }
}
