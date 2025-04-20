import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecognitionService } from './recognition.service';
import { CreateRecognitionDto } from './dtos/create-recognition.dto';
import { ApiTags, ApiOperation, ApiBody, ApiConsumes } from '@nestjs/swagger';

@ApiTags('Recognition')
@Controller('recognition')
export class RecognitionController {
  constructor(private readonly recognitionService: RecognitionService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new recognition' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createRecognitionDto: CreateRecognitionDto,
  ) {
    if (!file) {
      throw new Error('Image file is required');
    }

    const imageUrl = await this.recognitionService.uploadImageToS3(file);
    return this.recognitionService.createRecognitionEvent(
      createRecognitionDto,
      imageUrl,
    );
  }

  @Post('post-single')
  @ApiOperation({ summary: 'Create a new recognition without saving to db' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image file to be uploaded',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async postSingleImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file provided');
    }
    return this.recognitionService.recognizeSingleImage(file);
  }
}
