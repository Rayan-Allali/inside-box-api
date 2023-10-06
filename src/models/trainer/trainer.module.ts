import { Module } from '@nestjs/common';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from './trainer.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer]), AuthModule],
  controllers: [TrainerController],
  providers: [TrainerService],
})
export class TrainerModule {}
