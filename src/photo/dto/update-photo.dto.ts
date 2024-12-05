// src/photo/dto/update-photo.dto.ts
import { IsString, IsOptional, IsUrl } from 'class-validator';
import { Category } from '../../category/category.entity';

export class UpdatePhotoDto {
  @IsOptional()
  @IsString()
  filename?: string;

  @IsOptional()
  categories?: Category[];  // Change this to Category[] instead of string[]

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  url?: string;
}
