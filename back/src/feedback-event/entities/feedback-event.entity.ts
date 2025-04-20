import { ApiProperty } from '@nestjs/swagger';
import { FeedbackEvent } from '@prisma/client';

export class FeedbackEventEntity implements FeedbackEvent {
  @ApiProperty({ description: 'Unique ID of the feedback event' })
  feedbackEventId: string;

  @ApiProperty({ description: 'Associated recognition event ID' })
  recognitionId: string;

  @ApiProperty({ description: 'Feedback text provided by the user' })
  feedbackText: string;

  @ApiProperty({ description: 'Indicates if the feedback has been answered' })
  isAnswered: boolean;

  @ApiProperty({ description: 'ID of the user who provided the feedback' })
  userId: string;

  @ApiProperty({
    description: 'ID of the admin who responded to the feedback',
    nullable: true,
  })
  adminId: string | null;

  @ApiProperty({ description: 'Response text from the admin', nullable: true })
  adminResponse: string | null;

  // Optional relation properties
  @ApiProperty({
    description: 'Recognition event associated with this feedback',
    nullable: true,
  })
  recognitionEvent?: any; // Adjust type if needed

  @ApiProperty({
    description: 'Notifications associated with this feedback event',
    nullable: true,
    type: () => [Object], // Adjust type if needed
  })
  Notification?: any[]; // Adjust type if needed
}
