import * as bcrypt from 'bcryptjs';
const saltOrRounds = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltOrRounds);
};

export const comparePassword = async (
  password: string,
  hashPassword: string,
) => {
  return await bcrypt.compare(password, hashPassword);
};
