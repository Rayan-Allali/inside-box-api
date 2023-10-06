/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Answer } from './answer.entity';
import { Chapitre } from '../chapitre/chapitre.entity';
import { TestStudent } from './testStudent.entity';

@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  question: string;
  @OneToMany(()=>Answer,answer=>answer.test)
  answers: Answer[];
  @Column()
  chpitreId:number;
  @ManyToOne(()=>Chapitre,chapitre=>chapitre.tests)
  @JoinColumn({name:"chapitreId"})
  chapitre: Chapitre;

  @OneToMany(()=>TestStudent,testStudent=>testStudent.test)
  testsStudents:TestStudent[]
}