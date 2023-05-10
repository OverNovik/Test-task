import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column('bytea', { nullable: true })
  image: Buffer;

  @Column('bytea', { nullable: true })
  pdf: Buffer;
}
