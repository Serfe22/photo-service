// src/profile/dto/create-profile.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly bio: string;

  @IsOptional()
  @IsString()
  readonly avatarUrl?: string;

  @IsNotEmpty()
  readonly userId: number;  // Reference to the User who owns the profile
}
