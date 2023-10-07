import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Trainer } from '../trainer/trainer.entity';
import { Student } from '../students/student.entity';

@Entity()
export class Formation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  // One Author can have Many Books
  // @ManyToOne(() => Student, (student) => student.formations)
  // student: Student;
}
