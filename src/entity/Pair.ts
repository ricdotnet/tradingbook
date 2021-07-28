import {Entity, PrimaryColumn} from "typeorm";

@Entity('pairs')
export class Pair {

  @PrimaryColumn()
  pairName?: string
}