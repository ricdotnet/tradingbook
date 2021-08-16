import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";

@Entity("users")
export class User {

  @PrimaryGeneratedColumn("uuid")
  userId?: string

  @Column()
  username?: string

  @Column()
  password?: string

  @Column()
  email?: string

  @Column({
    nullable: true
  })
  firstName?: string;

  @Column({
    nullable: true
  })
  lastName?: string;

  @CreateDateColumn()
  createdAt?: string

  @Column({
    nullable: true
  })
  avatar?: string
}
