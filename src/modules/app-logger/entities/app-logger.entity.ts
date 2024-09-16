import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class AppLogger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, default: null })
  level: string;

  @Column({ nullable: true, default: null })
  context: string;

  @Column({ nullable: true, default: null })
  message: string;

  @Column({ nullable: true, default: null })
  meta: string;

  @CreateDateColumn()
  timestamp: Date;
}