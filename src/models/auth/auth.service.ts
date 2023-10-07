/* eslint-disable prettier/prettier */
import { Admin } from './../admin/admin.entity';
import { hash, compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../students/student.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface.payload';
import { Trainer } from '../trainer/trainer.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Trainer)
    private readonly TrainerRepo: Repository<Trainer>,
    @InjectRepository(Admin)
    private readonly AdminRepo: Repository<Trainer>,
    private readonly jwtService: JwtService,
  ) {}
  async StudentSignIn(credntials: SignInDto) {
    try {
      const student = await this.studentRepo.findOne({
        where: {
          email: credntials.email,
        },
      });
      if (!student) {
        return 0;
      }
      const isMatch = await compare(credntials.password, student.password);
      if (!isMatch) return 1;
      const payload: JwtPayload = {
        name: student.firstName + ' ' + student.lastName,
        id: student.id,
        email: credntials.email,
        role: 'Student',
      };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken , user:student };
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  async TrainnerSignIn(credntials: SignInDto) {
    try {
      const Trainer = await this.TrainerRepo.findOne({
        where: {
          email: credntials.email,
        },
      });
      if (!Trainer) {
        return 0;
      }
      const isMatch = await compare(credntials.password, Trainer.password);
      if (!isMatch) return 1;
      const payload: JwtPayload = {
        name: Trainer.name,
        id: Trainer.id,
        email: credntials.email,
        role: 'Trainer',
      };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken,user:Trainer };
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
  async AdminSignIn(credntials: SignInDto) {
    try {
      const admin = await this.AdminRepo.findOne({
        where: {
          email: credntials.email,
        },
      });
      if (!admin) {
        return 0;
      }
      const isMatch = await compare(credntials.password, admin.password);
      if (!isMatch) return 1;
      const payload: JwtPayload = {
        name: admin.name,
        id: admin.id,
        email: credntials.email,
        role: 'Admin',
      };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken,user:admin };
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }

  async verifyEmail(
    credntials: SignInDto,
  ): Promise<'Admin' | 'Student' | 'Trainer' | null> {
    try {
      const student = await this.studentRepo.findOne({
        where: {
          email: credntials.email,
        },
      });
      if (!student) {
        const trainer = await this.TrainerRepo.findOne({
          where: {
            email: credntials.email,
          },
        });
        if (!trainer) {
          const admin = await this.AdminRepo.findOne({
            where: {
              email: credntials.email,
            },
          });
          if (!admin) {
            return null;
          } else {
            return 'Admin';
          }
        } else {
          return 'Trainer';
        }
      } else {
        return 'Student';
      }
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
  async GlobalSignIn(credntials: SignInDto) {

      const user = await this.verifyEmail(credntials);
      if (!user) {
        return null;
      }else{
        if(user === "Admin"){
          const admin= await this.AdminSignIn(credntials);
          return admin;
        }else if(user === "Trainer"){
          const trainer=await this.TrainnerSignIn(credntials);
          return trainer
        }else{
          const student =await this.StudentSignIn(credntials);
          return student
        }
      }
  }
}
