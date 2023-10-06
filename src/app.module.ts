/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './models/students/students.module';
import { AuthModule } from './models/auth/auth.module';
import { TrainerModule } from './models/trainer/trainer.module';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
