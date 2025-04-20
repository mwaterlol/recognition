import { Module } from '@nestjs/common';
import { FeedbackEventService } from './feedback-event.service';
import { FeedbackEventController } from './feedback-event.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [FeedbackEventService],
  controllers: [FeedbackEventController],
  imports: [PrismaModule],
})
export class FeedbackEventModule {}
