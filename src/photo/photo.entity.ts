// src/photo/photo.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/user.entity';  // Adjust path if necessary
import { Category } from '../category/category.entity';  // Adjust path if necessary

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;

  @ManyToMany(() => Category, (category) => category.photos)
  @JoinTable()
  categories: Category[];
}
