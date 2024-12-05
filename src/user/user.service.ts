// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';  // For hashing passwords

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Adjusted method to handle both string and number for 'id'
  async findOne(id: string | number): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { id: +id },  // Using 'where' for FindOneOptions
    });
  }


  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,  // Store hashed password
    });

    return this.userRepository.save(newUser);  // Save and return the new user
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }


  // Update an existing user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  // Delete a user
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Find a user by email (for authentication purposes)
  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
