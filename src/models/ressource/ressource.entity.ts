/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Chapitre } from '../chapitre/chapitre.entity';

@Entity()
export class Ressource {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  driveLink:string
  @Column()
  chapitreId:number
  @ManyToOne(()=>Chapitre,(chapitre)=>chapitre.ressources,{onDelete: 'CASCADE', onUpdate:'CASCADE',cascade: true})
  @JoinColumn({name:'chapitreId'})
  chapitre:Chapitre
}