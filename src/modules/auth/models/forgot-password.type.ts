import { UserEntity } from '../entities/user.entity';

export interface PayloadForgotPassword {
  user: UserEntity;
  recoverCode: string;
}
