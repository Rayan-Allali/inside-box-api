import { Module } from '@nestjs/common';
import { HomeWorkController } from './homework.controller';
import { HomeWorkService } from './homework.service';

@Module({
  controllers: [HomeWorkController],
  providers: [HomeWorkService],
})
export class HomeWorkModule {}
