/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { StudentFormation } from '../formation/studentFormation.entity';
import { HomeWorkSubmition } from '../homeworkSubmition/homeworkSubmition.entity';
import { TestStudent } from '../test/testStudent.entity';

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
  // @OneToMany(()=>StudentFormation,studentFormation=>studentFormation.student)
  // studentFormations: StudentFormation[];
  // @OneToMany(()=>HomeWorkSubmition,homeworkSubmition=>homeworkSubmition.student)
  // homeworksSubmitions: HomeWorkSubmition[];
  // @OneToMany(()=>TestStudent,testStudent=>testStudent.student)
  // testsStudents:TestStudent[]
}