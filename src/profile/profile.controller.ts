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
  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: number): Promise<Profile> {
    return this.profileService.findByUserId(userId);
  }

  // Update a profile by user ID
  @Put('user/:userId')
  async update(
    @Param('userId') userId: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return this.profileService.update(userId, updateProfileDto);
  }

  // Delete a profile by user ID
  @Delete('user/:userId')
  async remove(@Param('userId') userId: number): Promise<void> {
    return this.profileService.remove(userId);
  }
}
