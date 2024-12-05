// src/photo/dto/create-photo.dto.ts
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUrl()
  url: string;

  @IsString()
  userId: string;  // If you are sending the user ID when creating a photo

  @IsOptional()
  categories?: string[];  // Assuming categories are sent as an array of category IDs
}