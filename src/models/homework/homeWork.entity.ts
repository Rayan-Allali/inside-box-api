/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Trainer } from '../trainer/trainer.entity';
import { HomeWorkSubmition } from '../homeworksubmition/homeworkSubmition.entity';
import { Chapitre } from '../chapitre/chapitre.entity';
@Entity()
export class HomeWork {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  problems:string
  @Column()
  type:string
  @Column()
  chapitreId:number
  @ManyToOne(()=>Chapitre,(chapitre)=>chapitre.homeworks,{onDelete: 'CASCADE', onUpdate:'CASCADE',cascade: true})
  @JoinColumn({name:"chapitreId"})
  chapitre:Chapitre
  // @Column()
  // trainerId:number
  // @ManyToOne(()=>Trainer,trainer=>trainer.homeWorks)
  // @JoinColumn({name:"trainerId"})
  // trainer:Trainer
  @OneToMany(()=>HomeWorkSubmition,homeworkSubmition=>homeworkSubmition.homework)
  homeworksSubmitions:HomeWorkSubmition[]
}