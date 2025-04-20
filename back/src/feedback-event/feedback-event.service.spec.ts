import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackEventService } from './feedback-event.service';

describe('FeedbackEventService', () => {
  let service: FeedbackEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackEventService],
    }).compile();

    service = module.get<FeedbackEventService>(FeedbackEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
