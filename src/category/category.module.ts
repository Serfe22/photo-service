// src/category/category.module.ts
import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Photo } from '../photo/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Photo])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],  // Export CategoryService for use in other modules if needed
})
export class CategoryModule {}
