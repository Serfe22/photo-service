// src/profile/dto/create-profile.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()  // Gender should be required
  @IsString()
  readonly gender: string;  // Gender field

  @IsNotEmpty()  // Photo should be required
  @IsString()
  readonly photo: string;  // Photo URL or file path

  @IsNotEmpty()  // Reference to the User who owns the profile
  readonly userId: number;
}
