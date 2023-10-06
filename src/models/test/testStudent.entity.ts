/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { StudentFormation } from '../formation/studentFormation.entity';
import { HomeWorkSubmition } from '../homeworkSubmition/homeworkSubmition.entity';
import { Answer } from './answer.entity';
import { Chapitre } from '../chapitre/chapitre.entity';
import { Student } from '../students/student.entity';
import { TestEntity } from './test.entity';

@Entity()
export class TestStudent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  note: number;
//   @Column()
//   studentId: number;
//   @ManyToOne(()=>Student,student=>student.testsStudents)
//   @JoinColumn({name:"studentId:"})
//   student: Student;
  @Column()
  testId:number;
  @ManyToOne(()=>TestEntity,testEntity=>testEntity.testsStudents)
  @JoinColumn({name:"testId"})
  test: TestEntity;
}