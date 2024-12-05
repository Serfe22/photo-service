// src/photo/photo.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,  // Injecting the Photo repository
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a new photo
  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const { categories, userId, ...photoData } = createPhotoDto;
    
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const categoryEntities = await this.categoryRepository.findByIds(categories);
    
    const newPhoto = this.photoRepository.create({
      ...photoData,
      user,
      categories: categoryEntities,
    });

    return this.photoRepository.save(newPhoto);
  }

  // Get all photos
  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find({ relations: ['user', 'categories'] });
  }

  // Find one photo by ID
  async findOne(id: number): Promise<Photo> {
    return this.photoRepository.findOne({ where: { id }, relations: ['user', 'categories'] });
  }

  // Update a photo by ID
  async update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
    await this.photoRepository.update(id, updatePhotoDto);
    return this.findOne(id);
  }

  // Delete a photo by ID
  async remove(id: number): Promise<void> {
    await this.photoRepository.delete(id);
  }
}
