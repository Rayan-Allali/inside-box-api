/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Formation } from '../formation/formation.entity';

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
  @Column({ default: "Trainer" })
  role:string
    // @OneToMany(()=>Formation,(formation)=>formation.trainer)
    // formations:Formation[]
}