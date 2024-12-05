// src/photo/dto/update-photo.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdatePhotoDto {
  @IsOptional()
  @IsString()
  readonly filename?: string;
}
