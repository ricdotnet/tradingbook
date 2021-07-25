import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Trade} from "./Trade";

@Entity('pairs')
export class Pair {

  @PrimaryGeneratedColumn()
  pairId?: number

  @OneToMany(() => Trade, trade => trade.pairName)
  @Column()
  pairName?: string
}