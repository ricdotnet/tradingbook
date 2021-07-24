import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('pairs')
export class Pair {
  constructor() {
    this.id = 0
    this.pair = ''
  }

  @PrimaryGeneratedColumn()
  id: number

  @Column()
  pair: string
}