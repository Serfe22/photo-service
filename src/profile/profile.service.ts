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
    await this.profileRepository.update({ user: { id: userId } }, updateProfileDto);
    return this.findByUserId(userId);
  }

  // Delete a profile by user ID
  async remove(userId: number): Promise<void> {
    await this.profileRepository.delete({ user: { id: userId } });
  }
}
