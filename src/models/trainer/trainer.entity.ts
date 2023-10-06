/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Formation } from '../formation/formation.entity';
import { HomeWork } from '../homework/homeWork.entity';

@Entity()
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  pictureURL?: string;
//   @OneToMany(()=>Formation,formation=>formation.trainer)
//   formations:Formation[]
//   @OneToMany(()=>HomeWork,homework=>homework.trainer)
//   homeWorks:HomeWork[]
}