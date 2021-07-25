import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn} from 'typeorm';
import {User} from "./User";
import {Pair} from "./Pair";

@Entity('trades')
export class Trade {

  @PrimaryGeneratedColumn('uuid')
  tradeId?: string

  @ManyToOne(() => Pair, pair => pair.pairName)
  @Column()
  pairName?: string

  @Column()
  entry?: number

  @Column()
  exit?: number

  // auto added
  @CreateDateColumn()
  createdAt?: string

  @ManyToOne(() => User, user => user.userId)
  @Column('uuid')
  userId?: string
}