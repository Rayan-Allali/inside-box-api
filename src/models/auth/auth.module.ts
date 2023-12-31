import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../students/student.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { Trainer } from '../trainer/trainer.entity';
import { Admin } from '../admin/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student]),
    TypeOrmModule.forFeature([Trainer]),
    TypeOrmModule.forFeature([Admin]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.myJWTSecret,
        signOptions: { expiresIn: '1000h' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
