/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './models/students/students.module';
import { AuthModule } from './models/auth/auth.module';
import { TrainerModule } from './models/trainer/trainer.module';
import { AdminModule } from './models/admin/admin.module';
import { FormationModule } from './models/formation/formation.module';
import { ChapitreModule } from './models/chapitre/chapitre.module';
import { RessourceModule } from './models/ressource/ressource.module';
import { HomeWorkModule } from './models/homework/homework.module';
import { HomeworkSubmitionModule } from './models/homeworkSubmition/homeworkSubmition.module';
import { TestModule } from './models/test/test.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        synchronize: true, // Set to false in production
      }),
    }),
    StudentsModule,
    AuthModule,
    TrainerModule,
    AdminModule,
    FormationModule,
    ChapitreModule,
    RessourceModule,
    HomeWorkModule,
    HomeworkSubmitionModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
