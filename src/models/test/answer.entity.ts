/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TestEntity } from './test.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  response: string;
  @Column()
  correct: boolean;
  @Column({ default: 0 })
  exp: number;
  @ManyToOne(()=>TestEntity,testEntity=>testEntity.answers)
  test: TestEntity;
}