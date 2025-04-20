import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackEventController } from './feedback-event.controller';

describe('FeedbackEventController', () => {
  let controller: FeedbackEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbackEventController],
    }).compile();

    controller = module.get<FeedbackEventController>(FeedbackEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
