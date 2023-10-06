/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from '../students/student.entity';
import { Formation } from './formation.entity';

@Entity()
export class StudentFormation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  studentId: number;
  @Column()
  formationId: number;
  @Column()
  progress: string;

//   @ManyToOne(()=>Student,(student)=>student.studentFormations,{onDelete: 'CASCADE', onUpdate:'CASCADE',cascade: true})
//   @JoinColumn({name:'studentId'})
//     student:Student;
//   @ManyToOne(()=>Formation,(formation)=>formation.studentFormations,{onDelete: 'CASCADE', onUpdate:'CASCADE',cascade: true})
//   @JoinColumn({name:'formationId'})
//     formation:Formation;
}