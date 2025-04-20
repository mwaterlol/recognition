import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackEventDto {
  @ApiProperty({ description: 'Associated recognition event ID' })
  @IsString()
  recognitionId: string;

  @ApiProperty({ description: 'Feedback text provided by the user' })
  @IsString()
  feedbackText: string;

  @ApiProperty({ description: 'Indicates if the feedback has been answered' })
  @IsBoolean()
  isAnswered: boolean;

  @ApiProperty({ description: 'ID of the user who provided the feedback' })
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'ID of the admin who responded to the feedback',
    required: false,
  })
  @IsOptional()
  @IsString()
  adminId?: string; // Optional, defaults to null

  @ApiProperty({ description: 'Response text from the admin', required: false })
  @IsOptional()
  @IsString()
  adminResponse?: string; // Optional, defaults to null
}
