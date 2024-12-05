// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';  // User service to fetch user details
// src/auth/auth.service.ts
import * as bcrypt from 'bcryptjs';  // Use bcryptjs


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,  // User service to access the user repository
    private jwtService: JwtService,    // JWT service for token generation
  ) {}

  // Validate user credentials and return JWT token if valid
  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);  // Find user by email

    // Validate password using bcrypt
    if (user && bcrypt.compareSync(password, user.password)) {
      const payload = { sub: user.id, username: user.email };  // JWT payload (user's ID and email)
      return {
        access_token: this.jwtService.sign(payload),  // Sign and return JWT token
      };
    }
    return null;  // If credentials are invalid
  }

  // Validate user in Passport strategy
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }
}
