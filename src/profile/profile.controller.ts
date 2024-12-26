// src/profile/profile.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './profile.entity';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // Create a new profile
  @Post()
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileService.create(createProfileDto);
  }

  // Get a profile by user ID
  @Get('user/:userid')
  async getProfileByUserId(@Param('userId') userId: number) {
    const profile = await this.profileService.findByUserId(userId);
    if (!profile) {
      return { message: 'Profile not found' };  // Return a message if no profile is found
    }
    return profile;  // Return the profile if found
  }

  // Update a profile by user ID
  @Put('user/:userId')
  async updateProfileByUserId(@Param('userId') userId: number, @Body() updateProfileDto: UpdateProfileDto) {
  const profile = await this.profileService.findByUserId(userId);
  if (!profile) {
    return { message: 'Profile not found' };  // Return a message if no profile is found
  }

  const updatedProfile = await this.profileService.update(userId, updateProfileDto);
  return updatedProfile;  // Return the updated profile
}

  // Delete a profile by user ID
  @Delete('user/:userId')
  async remove(@Param('userId') userId: number): Promise<void> {
    return this.profileService.remove(userId);
  }
}
