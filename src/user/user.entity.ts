// src/user/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Photo } from '../photo/photo.entity';
import { Profile } from '../profile/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;
  
  @Column({ unique: true })  // Ensure email is unique
  email: string;  // This field should exist in your User entity

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[]; // One-to-Many relationship with Photo

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn() // Link the profile column with the user
  profile: Profile; // One-to-One relationship with Profile
}
