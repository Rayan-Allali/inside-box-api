/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsController } from './models/students/students.controller';
import { StudentsModule } from './models/students/students.module';
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
    // CategoryModule,
    // RoadmapModule,
    // CourseModule,
    // CheckpointModule,
    // GdgContentModule,
    // TagModule,
    // ProjectModule,
    // RessourceModule,
    // QuizzModule,
    // UserModule,
    // FeedbackModule,
    // NotificationModule,
    // ChallangeModule,
    // ProjectSubmissionModule,
    // UserPositionModule,
    // ChallangeSubmissionModule,
    // AuthModule,
  ],
  controllers: [AppController, StudentsController],
  providers: [AppService],
})
export class AppModule {}
