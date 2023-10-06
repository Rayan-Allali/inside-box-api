/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';

export class CreateFormationDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  category:string
  @IsNumber()
  trainerId:number
}

// @PrimaryGeneratedColumn()
// name: string;
// @Column()
// description: string;
// @Column()
// coverUrl:string
// @Column()
// category:string
// @OneToMany(()=>Chapitre,(chapitre)=>chapitre.formation)
// chapitres:Chapitre[]
//   @OneToMany(()=>StudentFormation,(studentFormation)=>studentFormation.formation)
//   studentFormations:StudentFormation[]
//   @Column()
//   trainerId:number
//   @ManyToOne(()=>Trainer,trainer=>trainer.formations)
//   @JoinColumn({name:"trainerId"})
//   trainer:Trainer