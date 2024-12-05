// src/photo/photo.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';  // Adjust path if necessary
import { Category } from '../category/category.entity';  // Adjust path if necessary

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;  // Add name column for the photo's name

  @Column({ nullable: true })
  location: string;  // Add location column for where the photo was taken

  @Column({ nullable: true })
  description: string;  // Add description column for photo description

  @Column()
  url: string;  // URL or file path for the photo

  @CreateDateColumn()
  createdAt: Date;  // Automatically handled by TypeORM

  @UpdateDateColumn()
  modifiedAt: Date;  // Automatically handled by TypeORM

  @ManyToOne(() => User, (user) => user.photos)
  user: User;  // Relationship to the User entity
  
  @ManyToMany(() => Category, (category) => category.photos)
  @JoinTable()  // This creates the join table for the ManyToMany relationship
  categories: Category[];  // Ensure this property exists
}
