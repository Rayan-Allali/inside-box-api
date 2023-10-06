import { Module } from '@nestjs/common';
import { HomeworkSubmitionController } from './homeworkSubmition.controller';
import { HomeworkSubmitionService } from './homeworkSubmition.service';

@Module({
  controllers: [HomeworkSubmitionController],
  providers: [HomeworkSubmitionService],
})
export class HomeworkSubmitionModule {}
