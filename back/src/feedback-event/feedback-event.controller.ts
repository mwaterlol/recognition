import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { FeedbackEventService } from './feedback-event.service';
import { CreateFeedbackEventDto } from './dtos/create-feedback-event.dto';
import { UpdateFeedbackEventDto } from './dtos/update-feedback-event.dto';

@ApiTags('FeedbackEvent')
@Controller('feedback-event')
export class FeedbackEventController {
  constructor(private readonly feedbackEventService: FeedbackEventService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new feedback event' })
  create(@Body() createFeedbackEventDto: CreateFeedbackEventDto) {
    return this.feedbackEventService.create(createFeedbackEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all feedback events' })
  findAll() {
    return this.feedbackEventService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a feedback event by ID' })
  @ApiParam({ name: 'id', description: 'Feedback event ID' })
  findOne(@Param('id') id: string) {
    return this.feedbackEventService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a feedback event by ID' })
  @ApiParam({ name: 'id', description: 'Feedback event ID' })
  update(
    @Param('id') id: string,
    @Body() updateFeedbackEventDto: UpdateFeedbackEventDto,
  ) {
    return this.feedbackEventService.update(id, updateFeedbackEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a feedback event by ID' })
  @ApiParam({ name: 'id', description: 'Feedback event ID' })
  remove(@Param('id') id: string) {
    return this.feedbackEventService.delete(id);
  }
}
