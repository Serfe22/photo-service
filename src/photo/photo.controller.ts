// src/photo/photo.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './photo.entity';

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  // Create a new photo
  @Post()
  async create(@Body() createPhotoDto: CreatePhotoDto): Promise<Photo> {
    return this.photoService.create(createPhotoDto);
  }

  // Get all photos
  @Get()
  async findAll(): Promise<Photo[]> {
    return this.photoService.findAll();
  }

  // Get a specific photo by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Photo> {
    return this.photoService.findOne(id);
  }

  // Update a photo by ID
  @Put(':id')
  async update(@Param('id') id: number, @Body() updatePhotoDto: UpdatePhotoDto): Promise<Photo> {
    return this.photoService.update(id, updatePhotoDto);
  }

  // Delete a photo by ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.photoService.remove(id);
  }
}
