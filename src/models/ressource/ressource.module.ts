import { Module } from '@nestjs/common';
import { RessourceService } from './ressource.service';
import { RessourceController } from './ressource.controller';

@Module({
  providers: [RessourceService],
  controllers: [RessourceController]
})
export class RessourceModule {}
