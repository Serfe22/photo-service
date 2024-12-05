// src/category/category.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Photo } from '../photo/photo.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;  // Add description column

  @CreateDateColumn()
  createdAt: Date;  // Automatically handled by TypeORM

  @UpdateDateColumn()
  modifiedAt: Date;  // Automatically handled by TypeORM

  @ManyToMany(() => Photo, (photo) => photo.categories)
  photos: Photo[];
}
