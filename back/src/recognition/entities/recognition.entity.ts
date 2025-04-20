import { UserEntity } from 'src/users/entities/user.entity';

export class RecognitionEvent {
  recognitionId: string;
  userId: string;
  date: Date;
  recognitionResult: string;
  userEditResult: string;
  hasImageInDb: boolean;
  imageId: string;

  user: UserEntity;
  notifications: [];
  feedbackEvents: [];
}
