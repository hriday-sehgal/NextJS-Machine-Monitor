
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(loginDto: LoginDto) {
    if (
      loginDto.email !== 'admin@example.com' ||
      loginDto.password !== 'password123'
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: loginDto.email, sub: 1 };
    
    return {
      token: this.jwtService.sign(payload),
      user: {
        email: loginDto.email,
        name: 'Admin User',
      },
    };
  }
}
