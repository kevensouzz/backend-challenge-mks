import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "movies"})
export class Movie {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ApiProperty()
  @Column()
  title: string
  
  @ApiProperty()
  @Column()
  director: string
  
  @ApiProperty()
  @Column()
  genre: string

  @ApiProperty()
  @Column()
  releaseYear: number

  @ApiProperty()
  @Column()
  rating: number

  @ApiProperty()
  @Column()
  originCountry: string

  @ApiProperty()
  @Column()
  language: string
}
