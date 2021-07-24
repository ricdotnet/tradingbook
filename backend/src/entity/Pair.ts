import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('pairs')
export class Pair {

  @PrimaryGeneratedColumn()
  pairId?: number

  @Column()
  pairName?: string
}