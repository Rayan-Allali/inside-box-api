import { Module } from '@nestjs/common';
import { ChapitreController } from './chapitre.controller';
import { ChapitreService } from './chapitre.service';

@Module({
  controllers: [ChapitreController],
  providers: [ChapitreService]
})
export class ChapitreModule {}
