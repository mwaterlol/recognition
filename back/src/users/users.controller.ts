import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from './user.decorator';

@Controller('user')
@ApiTags('User')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserEntity(await this.usersService.create(createUserDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @ApiOperation({ summary: 'Get user data' })
  async findOne(@CurrentUser() user: UserEntity) {
    const id = user.id;
    return new UserEntity(await this.usersService.findOne(id));
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  @ApiOperation({ summary: 'Patch user data' })
  async update(
    @CurrentUser() user: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const id = user.id;
    return new UserEntity(await this.usersService.update(id, updateUserDto));
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserEntity })
  @ApiOperation({ summary: 'Delete user' })
  async remove(@CurrentUser() user: UserEntity) {
    const id = user.id;
    return new UserEntity(await this.usersService.remove(id));
  }
}
