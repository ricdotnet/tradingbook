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

  @Column({type: 'float', precision: 6})
  entry?: number

  @Column({type: 'float', precision: 6})
  exit?: number

  @Column({default: 'Long'})
  type?: string

  // auto added
  @CreateDateColumn()
  createdAt?: string

  @ManyToOne(() => User, user => user.userId)
  @Column('uuid')
  userId?: string
}