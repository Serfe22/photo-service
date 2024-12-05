// src/photo/photo.module.ts
import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Category, User])],
  controllers: [PhotoController],
  providers: [PhotoService],
  exports: [PhotoService],  // Export PhotoService for use in other modules if needed
})
export class PhotoModule {}
