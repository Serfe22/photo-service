// src/profile/profile.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '../user/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,  // Injecting the Profile repository
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a new profile
  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const { userId, ...profileData } = createProfileDto;
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const newProfile = this.profileRepository.create({
      ...profileData,
      user,
    });

    return this.profileRepository.save(newProfile);
  }

  // Get profile by user ID
  async findByUserId(userId: number): Promise<Profile> {
    return this.profileRepository.findOne({ where: { user: { id: userId } } });
  }

  // Update a profile by user ID
  async update(userId: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    const profile = await this.profileRepository.findOne({ where: { user: { id: userId } } });
  
    if (!profile) {
      throw new Error('Profile not found');
    }
  
    // Check if 'photo' exists in the DTO and update it
    if (updateProfileDto.photo) {
      profile.photo = updateProfileDto.photo;  // Update the photo field if it exists
    }
  
    // Save and return the updated profile
    return this.profileRepository.save(profile); 
  }

  // Delete a profile by user ID
  async remove(userId: number): Promise<void> {
    await this.profileRepository.delete({ user: { id: userId } });
  }
}
