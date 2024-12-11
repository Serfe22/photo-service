import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { PhotoModule } from './photo/photo.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/category.entity';
import { Photo } from './photo/photo.entity';
import { Profile } from './profile/profile.entity';
import { User } from './user/user.entity';
import { PhotoCategory } from './photo-category/photo-category.entity'; 
import { JwtStrategy } from './auth/jwt.strategy';  // Correct path to jwt.strategy
import { ProfileModule } from './profile/profile.module';
// import { AuthModule } from './auth/auth.module'; 

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || '127.0.0.1', // Use 'mysql' if running inside Docker
      port: 3306,
      username: process.env.DATABASE_USER || 'photo_user',
      password: process.env.DATABASE_PASSWORD || 'photo_password',
      database: process.env.DATABASE_NAME || 'photo_service_db',
      entities: [User, Photo, Category, Profile, PhotoCategory],  // Add entities
      synchronize: true,  // Set to false in production
    }),
    UserModule,
    PhotoModule,
    CategoryModule,
    ProfileModule,
  ],
})
export class AppModule {}
