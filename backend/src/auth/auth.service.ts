import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async register(email: string, password: string, role: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (
      role !== 'admin' &&
      role !== 'hr'
    ) {
      throw new Error(
        'Invalid role selected',
      );
    }

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,

      },
    });

    return user;
  }

  async login(email: string, password: string) {
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    console.log("USER:", user);

    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error('Invalid password');

    const token = this.jwtService.sign({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: 'Login successful',
      access_token: token,
    };
  }
}
