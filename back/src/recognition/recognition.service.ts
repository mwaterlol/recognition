import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import * as crypto from 'crypto';
import { CreateRecognitionDto } from './dtos/create-recognition.dto';
import axios from 'axios';

@Injectable()
export class RecognitionService {
  private readonly s3Client: S3Client;

  constructor(private readonly prisma: PrismaService) {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadImageToS3(file: Express.Multer.File): Promise<string> {
    const fileName = `${crypto.randomUUID()}-${file.originalname}`;
    const bucketName = process.env.AWS_S3_BUCKET;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    await this.s3Client.send(command);

    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  }

  async createRecognitionEvent(data: CreateRecognitionDto, imageUrl: string) {
    return this.prisma.recognitionEvent.create({
      data: {
        ...data,
        hasImageInDb: true,
        imageId: imageUrl,
      },
    });
  }

  async recognizeSingleImage(
    file: Express.Multer.File,
  ): Promise<{ image: string; text: string }> {
    console.log(file);

    const imageBase64 = file.buffer.toString('base64');

    const image = `data:${file.mimetype};base64,${imageBase64}`;

    const blob = new Blob([file.buffer], { type: file.mimetype });

    const formData = new FormData();
    formData.append('file', blob, file.originalname);

    const response = await axios.post<{ text: string }>(
      'https://bba1vua4lf4q7qih259e.containers.yandexcloud.net/predict',
      formData,
    );
    console.log(response);
    return { image, text: response.data.text };
  }
}
