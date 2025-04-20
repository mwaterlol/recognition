import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RecognitionService } from './recognition.service';
import { RecognitionController } from './recognition.controller';

@Module({
  providers: [RecognitionService],
  controllers: [RecognitionController],
  imports: [PrismaModule],
})
export class RecognitionModule {}
