/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn } from 'typeorm';
import { Trainer } from '../trainer/trainer.entity';
import { HomeWork } from '../homework/homeWork.entity';
import { Student } from '../students/student.entity';
@Entity()
export class HomeWorkSubmition {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  solution:string
  @Column()
  note:number
  @ManyToOne(()=>HomeWork,(homework)=>homework.homeworksSubmitions,{onDelete: 'CASCADE', onUpdate:'CASCADE',cascade: true})
  @JoinColumn({name:"homeworkId"})
  homework:HomeWork
  @Column()
  homeworkId:number
  @Column()
  trainerId:number
  // @Column()
  // studentId:number
  // @ManyToOne(()=>Student,(student)=>student.homeworksSubmitions,{onDelete: 'CASCADE', onUpdate:'CASCADE',cascade: true})
  // @JoinColumn({name:"studentId"})
  // student:Student
}