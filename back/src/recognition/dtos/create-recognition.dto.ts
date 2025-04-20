import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class CreateRecognitionDto {
  @ApiProperty({
    default: 'id',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    default: '01.01.1970',
  })
  @IsDateString()
  date: Date;

  @ApiProperty({
    default: 'text',
  })
  @IsString()
  recognitionResult: string;

  @ApiProperty({
    default: 'text',
  })
  @IsString()
  userEditResult: string;
}
