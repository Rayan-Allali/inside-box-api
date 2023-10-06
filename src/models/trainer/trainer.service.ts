import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trainer } from './trainer.entity';
import { Repository } from 'typeorm';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { generatePassword } from 'src/utils/randomPasswordGenerator';
import { hash } from 'bcrypt';
import { sendMail } from 'src/utils/sendEmail';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private readonly TrainerRepository: Repository<Trainer>,
  ) {}

  async GetAll(): Promise<Trainer[]> {
    try {
      const Trainers = await this.TrainerRepository.find();
      return Trainers;
    } catch (err) {
      console.error(err);
      throw new Error('failed to get all Trainers ' + err.message);
    }
  }

  async GetOne(TrainerId: number): Promise<Trainer | null> {
    try {
      const Trainer = await this.TrainerRepository.findOne({
        where: {
          id: TrainerId,
        },
      });
      if (!Trainer) {
        return null;
      }
      return Trainer;
    } catch (err) {
      console.error(err);
      throw new Error('failed to get the Trainer ' + err.message);
    }
  }

  async Update(
    TrainerId: number,
    newTrainer: CreateTrainerDto,
  ): Promise<Trainer | null> {
    try {
      const Trainer = await this.TrainerRepository.findOne({
        where: {
          id: TrainerId,
        },
      });
      if (!Trainer) {
        return null;
      }
      const savedTrainer = await this.TrainerRepository.save(newTrainer);
      return savedTrainer;
    } catch (err) {
      console.error(err);
      throw new Error('failed to update the Trainer ' + err.message);
    }
  }

  async Delete(id: number): Promise<Trainer | null> {
    try {
      const Trainer = await this.TrainerRepository.findOne({ where: { id } });
      if (!Trainer) return null;
      await this.TrainerRepository.remove(Trainer);
      return Trainer;
    } catch (err) {
      console.error(err);
      throw new Error('failed to delete Trainer ' + err.message);
    }
  }

  async Create(newTrainer: CreateTrainerDto): Promise<Trainer | null> {
    try {
      const oldTrainer = await this.TrainerRepository.findOne({
        where: {
          email: newTrainer.email,
        },
      });
      if (oldTrainer) {
        return null;
      }
      const Trainer = await this.TrainerRepository.create(newTrainer);
      const randomPassword = generatePassword(12);
      Trainer.password = await hash(randomPassword, 10);
      console.log(randomPassword);
      console.log(Trainer.password);
      const emailText =
        `Dear ${Trainer.name},\n\n` +
        `Your trainer account at keyBox.dz has been created successfully. Here are your account details:\n\n` +
        `Username/Email: ${Trainer.email}\n` +
        `Password: ${randomPassword}\n\n` +
        `Please use these credentials to log in. Make sure to change your password after the first login for security reasons.\n\n` +
        `Best regards,\n`;
      //   + `${admin.name} (${admin.email})`;

      const emailSubject = 'Your KeyBox.dz Account Has Been Created';
      try {
        await sendMail({
          email: Trainer.email,
          text: `${emailText}`,
          subject: emailSubject,
        });
      } catch (err) {
        throw new Error('failed to send account to user' + err.message);
      }
      const savedTrainer = await this.TrainerRepository.save(Trainer);
      savedTrainer.password = undefined;
      return savedTrainer;
    } catch (err) {
      console.error(err);
      throw new Error('failed to create Trainer ' + err.message);
    }
  }
}
