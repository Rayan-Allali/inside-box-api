/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Formation } from '../formation/formation.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;
  
  @Column()
  password: string;
  
  @Column({ default: 0 })
  exp: number;
  
  @Column()
  age: number;

  @Column()
  gender: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  parentNumber: string;
  
  @Column({ nullable: true })
  pictureURL?: string;
  
  @Column({ default: "Student" })
  role:string
  // @OneToMany(()=>Formation,(formation)=>formation.student)
  // formations:Formation[]
}