/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Chapitre } from '../chapitre/chapitre.entity';
import { StudentFormation } from './studentFormation.entity';
import { Trainer } from '../trainer/trainer.entity';

@Entity()
export class Formation {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  coverUrl:string
  @Column()
  category:string
  @OneToMany(()=>Chapitre,(chapitre)=>chapitre.formation)
  chapitres:Chapitre[]
//   @OneToMany(()=>StudentFormation,(studentFormation)=>studentFormation.formation)
//   studentFormations:StudentFormation[]
//   @Column()
//   trainerId:number
//   @ManyToOne(()=>Trainer,trainer=>trainer.formations)
//   @JoinColumn({name:"trainerId"})
//   trainer:Trainer
}