import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackEventDto } from './create-feedback-event.dto';

export class UpdateFeedbackEventDto extends PartialType(
  CreateFeedbackEventDto,
) {}
