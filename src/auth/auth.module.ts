// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';  // Ensure the UserModule is imported to fetch users
import { JwtModule } from '@nestjs/jwt';  // JWT module for generating JWT tokens
import { JwtStrategy } from './jwt.strategy';  // JWT strategy for authentication guards

@Module({
  imports: [
    UserModule,  // Ensure this is imported to use the UserService for login and validation
    JwtModule.register({
      secret: 'your-secret-key',  // Use a strong secret key, or load it from an env variable
      signOptions: { expiresIn: '3600s' },  // JWT token expiration time (1 hour)
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
