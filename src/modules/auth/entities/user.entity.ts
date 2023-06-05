import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  names: string;

  @Column('text')
  lastName: string;

  @Column('varchar', {
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @Column({ nullable: true })
  recoverCode: string;

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
