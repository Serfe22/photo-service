// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Profile } from '../profile/profile.entity';
import { Photo } from '../photo/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Photo])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],  // Export UserService in case it's needed elsewhere (AuthModule)
})
export class UserModule {}
