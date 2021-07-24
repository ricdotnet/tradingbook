import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

@Entity("users")
export class User {

  constructor() {
    this.id = ''
    this.username = ''
    this.password = ''
    this.email = ''
    this.firstName = ''
    this.lastName = ''
    this.createdAt = ''
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  email: string

  @Column({
    nullable: true
  })
  firstName: string;

  @Column({
    nullable: true
  })
  lastName: string;

  @CreateDateColumn()
  createdAt: string

}
