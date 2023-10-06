import { hash, compare } from 'bcrypt';
import {  Injectable } from '@nestjs/common';
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
        name: student.name,
        id: student.id,
        email: credntials.email,
        role: 'Student',
      };
      const accessToken: string = await this.jwtService.sign(payload);

      return { accessToken };
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

      return { accessToken };
    } catch (err) {
      console.error(err);
      throw new Error(err);
    }
  }
}
