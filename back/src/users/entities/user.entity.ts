import { ApiProperty } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty({ enum: Role })
  role: Role;

  @ApiProperty()
  accessFailedCount: number;
}
