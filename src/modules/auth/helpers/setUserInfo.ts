import { UserInfo } from '../models/user-info';

export const setUserInfo = (req: any) => {
  const user: UserInfo = {
    id: req.id,
    names: req.names,
    lastName: req.lastName,
    email: req.email,
  };
  return user;
};
