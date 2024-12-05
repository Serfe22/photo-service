// src/photo/dto/create-photo.dto.ts
import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty()
  readonly filename: string;

  @IsArray()
  @IsNumber({}, { each: true })
  readonly categories: number[];

  @IsNumber()
  readonly userId: number;  // Reference to the User who owns the photo
}
