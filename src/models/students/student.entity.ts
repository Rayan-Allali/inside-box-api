/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Formation } from '../formation/formation.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ default: 0 })
  exp: number;
  @Column()
  age: number;
  @Column({ nullable: true })
  pictureURL?: string;
  @Column({ default: "Student" })
  role:string
  // @OneToMany(()=>Formation,(formation)=>formation.student)
  // formations:Formation[]
}