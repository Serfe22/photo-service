// src/photo-category/photo-category.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Photo } from '../photo/photo.entity';
import { Category } from '../category/category.entity';

@Entity()
export class PhotoCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Photo, (photo) => photo.categories)
  photo: Photo;

  @ManyToOne(() => Category, (category) => category.photos)
  category: Category;
}