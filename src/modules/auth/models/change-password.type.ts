import { UserEntity } from '../entities/user.entity';

export interface PayloadChangePassword {
  user: UserEntity;
}
