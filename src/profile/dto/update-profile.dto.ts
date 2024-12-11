// src/profile/dto/update-profile.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  readonly photo?: string;  // This is the field that exists in your Profile entity
}
