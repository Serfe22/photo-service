// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret', // Use a more secure key in production
    });
  }

  async validate(payload: any) {
    const userId = payload.sub;  // Assuming payload.sub is either string or number
    return this.userService.findOne(userId);  // Pass the userId to the findOne method
  }
}
