/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { Trainer } from './trainer.entity';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { SignInDto } from '../auth/dto/signIn.dto';
import { AuthService } from '../auth/auth.service';
import { Roles } from '../auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';

@Controller('trainers')
export class TrainerController {
  constructor(
    private trainerService: TrainerService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getTrainers(): Promise<Trainer[]> {
    try {
      const students = await this.trainerService.GetAll();
      return students;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to get all trainers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  async getTrainer(@Param('id') id: number) {
    try {
      const Trainer = await this.trainerService.GetOne(id);
      if (!Trainer) {
        return new NotFoundException();
      }
      return Trainer;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to get Trainer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put('/:id')
  @Roles('Admin', 'Trainer')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateTrainer(
    @Param('id') id: number,
    @Body() newTrainer: CreateTrainerDto,
  ) {
    try {
      const Trainer = await this.trainerService.Update(id, newTrainer);
      if (!Trainer) {
        return new NotFoundException();
      }
      return Trainer;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to update Trainer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  @HttpCode(204)
  @Roles('Admin', 'Student')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteTrainer(@Param('id') id: number) {
    try {
      const Trainer = await this.trainerService.Delete(id);
      if (!Trainer) {
        return new NotFoundException();
      }
      return null;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to delete Trainer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @HttpCode(201)
  @Roles('Admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createTrainer(@Body() newTrainer: CreateTrainerDto) {
    try {
      const Trainer = await this.trainerService.Create(newTrainer);
      if (!Trainer) {
        return new BadRequestException('there is a user with that email');
      }
      return Trainer;
    } catch (err) {
      throw new HttpException(
        'Error occurred while trying to create Trainer',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('/signIn')
  @HttpCode(201)
  async SignIn(@Body() credintial: SignInDto) {
    try {
      const token = await this.authService.TrainnerSignIn(credintial);
      if (token === 0) {
        return new BadRequestException('Email not found');
      } else if (token === 1) {
        return new BadRequestException('wrong password');
      }
      return token;
    } catch (err) {
      throw new Error('an error occurred while signing in' + err.message);
    }
  }
}
