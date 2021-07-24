import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
import {User} from "./User";

@Entity('trades')
export class Trade {
  constructor() {
    this.id = ''
    this.user = ''
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User, user => user.id)
  @Column('uuid')
  user: string
}