// src/auth/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';  // DTO for login data

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;  // Get login data from DTO
    const result = await this.authService.login(email, password);  // Call AuthService to validate and login

    if (!result) {
      return { message: 'Invalid credentials' };  // If login fails, return error
    }
    return result;  // Return the access token if login succeeds
  }
}
