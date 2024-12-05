// src/photo/photo.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';  // Import 'In' here
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
    
    // Fetch the user associated with the photo
    const user = await this.userRepository.findOne({ where: { id: Number(userId) } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Fetch categories associated with the photo
    const categoryEntities = await this.categoryRepository.find({
      where: { id: In(categories) },  // Assuming `categories` is an array of category IDs
    });
    if (categoryEntities.length !== categories.length) {
      throw new NotFoundException('Some categories not found');
    }

    // Create a new photo entity
    const newPhoto = this.photoRepository.create({
      ...photoData,
      user,
      categories: categoryEntities,
    });

    // Save and return the photo entity
    return this.photoRepository.save(newPhoto);
  }

  // Get all photos with relations (user and categories)
  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find({ relations: ['user', 'categories'] });
  }

  // Find one photo by ID with relations
  async findOne(id: number): Promise<Photo> {
    const photo = await this.photoRepository.findOne({ where: { id }, relations: ['user', 'categories'] });
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
    return photo;
  }

  // Update a photo by ID
 // src/photo/photo.service.ts
async update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
  const existingPhoto = await this.photoRepository.findOne({
    where: { id },
    relations: ['user', 'categories'], // Ensure categories are fetched when finding the photo
  });

  if (!existingPhoto) {
    throw new NotFoundException('Photo not found');
  }

  // If categories are being updated, find the Category entities using the category IDs
  if (updatePhotoDto.categories && updatePhotoDto.categories.length > 0) {
    const categoryEntities = await this.categoryRepository.find({
      where: { id: In(updatePhotoDto.categories) }, // Fetch the Category entities by their IDs
    });

    // Replace the category IDs with the actual Category entities
    updatePhotoDto.categories = categoryEntities;
  }

  // Update the photo with the provided data
  await this.photoRepository.update(id, updatePhotoDto);

  // Return the updated photo with fresh data
  return this.findOne(id); // Ensures the updated photo is returned with the latest data
}


  // Delete a photo by ID
  async remove(id: number): Promise<void> {
    const photo = await this.findOne(id);  // Ensure photo exists before trying to delete
    await this.photoRepository.delete(id);
  }
}
