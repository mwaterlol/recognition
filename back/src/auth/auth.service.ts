import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthEntity } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

const roundsOfHashing = 10;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }

  async register(
    email: string,
    password: string,
    username: string,
  ): Promise<AuthEntity> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException(`Email is already taken: ${email}`);
    }

    const existingUsername = await this.prisma.user.findFirst({
      where: { username },
    });

    if (existingUsername) {
      throw new ConflictException(`Username is already taken: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, roundsOfHashing);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        role: 'User',
        accessFailedCount: 0,
      },
    });

    // Return the authentication token
    return {
      accessToken: this.jwtService.sign({ userId: newUser.id }),
    };
  }
}
