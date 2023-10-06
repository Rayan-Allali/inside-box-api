/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Formation } from '../formation/formation.entity';
import { Ressource } from '../ressource/ressource.entity';
import { HomeWork } from '../homework/homeWork.entity';
import { TestEntity } from '../test/test.entity';

@Entity()
export class Chapitre {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description:string
  @Column()
  coverUrl:string
  @Column()
  formationId:string
  @ManyToOne(()=>Formation,(formation)=>formation.chapitres,{onDelete: 'CASCADE', onUpdate:'CASCADE',cascade: true})
  @JoinColumn({name:'formationId'})
  formation:Formation
  @OneToMany(()=>Ressource,ressource=>ressource.chapitre)
  ressources:Ressource[]
  
  @OneToMany(()=>HomeWork,homework=>homework.chapitre)
  homeworks:HomeWork[]

  @OneToMany(()=>TestEntity,test=>test.chapitre)
  tests: TestEntity[];
}