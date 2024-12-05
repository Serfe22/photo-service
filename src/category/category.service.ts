// src/category/category.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,  // Injecting the Category repository
  ) {}

  // Create a new category
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCategory);  // Save and return the new category
  }

  // Find all categories
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  // Find one category by ID
  async findOne(id: number): Promise<Category> {
    // src/category/category.service.ts
    return this.categoryRepository.findOne({ where: { id } });

  }

  // Update a category by ID
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  // Delete a category by ID
  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
