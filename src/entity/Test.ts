import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import {Trade} from "./Trade";

@Entity('tests')
export class Test {

  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string

  @Column()
  age?: number

  @ManyToOne(() => Trade, trade => trade.entry)
  @Column()
  pair?: number
}