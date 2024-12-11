// src/profile/profile.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: string;

  @Column({ nullable: true })
  photo: string; // Photo URL or file path

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn() // Link the profile back to the user
  user: User; // One-to-One relationship with User
}
