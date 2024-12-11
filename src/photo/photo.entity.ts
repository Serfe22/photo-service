// src/photo/photo.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Category } from '../category/category.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  url: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @ManyToOne(() => User, (user) => user.photos)
  user: User; // Many-to-One relationship with User

  @ManyToMany(() => Category, (category) => category.photos)
  @JoinTable() // This creates the join table for the Many-to-Many relationship
  categories: Category[]; // Many-to-Many relationship with Category
}
