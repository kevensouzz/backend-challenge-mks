import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ApiProperty()
  @Column({ unique: true, type: 'text', nullable: false })
  username: string

  @ApiProperty()
  @Column({ unique: false, type: 'text', nullable: false })
  password: string
}
