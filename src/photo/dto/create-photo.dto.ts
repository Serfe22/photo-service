// src/photo/dto/create-photo.dto.ts
import { IsString, IsOptional, IsUrl, IsArray, IsNumber } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  description: string;

  @IsUrl()
  url: string;

  @IsNumber()
  userId: number;

  @IsArray()
  @IsOptional()  // Make categories optional
  categories?: number[];  // categories will be an array of category IDs
}
