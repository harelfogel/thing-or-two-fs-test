import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('songs')
@Unique(['id', 'name', 'band', 'year'])
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({ length: 500 })
  band: string;

  @Column('int')
  year: number;
}
