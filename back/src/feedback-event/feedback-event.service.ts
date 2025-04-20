import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeedbackEventDto } from './dtos/create-feedback-event.dto';
import { UpdateFeedbackEventDto } from './dtos/update-feedback-event.dto';

@Injectable()
export class FeedbackEventService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFeedbackEventDto) {
    return this.prisma.feedbackEvent.create({ data });
  }

  async findAll() {
    return this.prisma.feedbackEvent.findMany({
      include: {
        recognitionEvent: true,
        user: true,
        admin: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.feedbackEvent.findUnique({
      where: { feedbackEventId: id },
      include: {
        recognitionEvent: true,
        user: true,
        admin: true,
      },
    });
  }

  async update(id: string, data: UpdateFeedbackEventDto) {
    return this.prisma.feedbackEvent.update({
      where: { feedbackEventId: id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.feedbackEvent.delete({ where: { feedbackEventId: id } });
  }
}
