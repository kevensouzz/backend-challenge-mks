import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique: true, type: 'text', nullable: false })
  username: string

  @Column({ unique: false, type: 'text', nullable: false })
  password: string
}
