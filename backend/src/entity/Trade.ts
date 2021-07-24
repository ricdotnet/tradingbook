import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {User} from "./User";

@Entity('trades')
export class Trade {

  @PrimaryGeneratedColumn('uuid')
  tradeId?: string

  @ManyToOne(() => User, user => user.userId)
  @Column('uuid')
  userId?: string
}