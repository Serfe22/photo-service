import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { User } from '../user/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto'; // Ensure this DTO is correctly imported
import { CreateProfileDto } from './dto/create-profile.dto'; // Import CreateProfileDto if needed

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a new profile for a user
  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const { userId } = createProfileDto;

    // Ensure the user exists before creating a profile
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    // Create a new profile linked to the user
    const profile = this.profileRepository.create({ ...createProfileDto, user });
    return this.profileRepository.save(profile);
  }

  // Find profile by userId
  async findByUserId(userId: number): Promise<Profile> {
    // Ensure the user exists
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    // Find the profile associated with the user
    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } }, // Looking for profile linked to userId
    });

    if (!profile) {
      throw new NotFoundException(`Profile for user with id ${userId} not found`);
    }

    return profile;
  }

  // Update profile
  async update(userId: number, updateProfileDto: UpdateProfileDto): Promise<Profile> {
    // Find the profile associated with the user
    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!profile) {
      throw new NotFoundException(`Profile for user with id ${userId} not found`);
    }

    // Update the profile fields
    Object.assign(profile, updateProfileDto);
    return this.profileRepository.save(profile);
  }

  // Delete profile
  async remove(userId: number): Promise<void> {
    // Find the profile associated with the user
    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!profile) {
      throw new NotFoundException(`Profile for user with id ${userId} not found`);
    }

    // Delete the profile
    await this.profileRepository.remove(profile);
  }
}
