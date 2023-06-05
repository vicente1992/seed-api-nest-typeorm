import { UserEntity } from '@modules/auth/entities/user.entity';

export interface RequestExtend extends Request {
  user: UserEntity;
}
