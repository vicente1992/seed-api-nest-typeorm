import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { JwtPayload } from '../models/jwt-payload';
import { UserEntity } from '../entities/user.entity';
import { UserInfo } from '../models/user-info';
import { LoginDto } from '../dto/login.dto';
import { handleError } from '@common/utils/handleError';
import { ForgotAuthDto } from '../dto/forgot-auth.dto';
import { generateRandomCode } from '../helpers/random-code';
import { ResetPasswordAuthDto } from '../models/reset-password-auth.dto';
import { comparePassword, hashPassword, setUserInfo } from '../helpers';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly authRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private eventEmitter: EventEmitter2,
  ) {}
  async register(
    createAuthDto: CreateAuthDto,
  ): Promise<{ user: UserInfo; token: string }> {
    try {
      const password = await hashPassword(createAuthDto.password);
      const userCreated = await this.authRepository.save({
        ...createAuthDto,
        password,
      });
      return {
        user: setUserInfo(userCreated),
        token: await this.tokenSing(userCreated),
      };
    } catch (error) {
      handleError(error);
    }
  }

  async login(loginDto: LoginDto): Promise<{ user: UserInfo; token: string }> {
    try {
      const { email, password } = loginDto;
      const user = await this.authRepository.findOne({ where: { email } });

      if (!user) throw new NotFoundException('USER_NOT_EXISTS');

      const checkPassword = await comparePassword(password, user.password);

      if (!checkPassword) throw new NotFoundException('USER_NOT_EXISTS');

      return {
        user: setUserInfo(user),
        token: await this.tokenSing(user),
      };
    } catch (error) {
      throw error;
    }
  }

  async refresh(id: string): Promise<{ user: UserInfo; token: string }> {
    const user: UserEntity = await this.authRepository.findOne({
      where: { id },
    });
    return {
      user: setUserInfo(user),
      token: await this.tokenSing(user),
    };
  }

  async forgot(forgotAuthDto: ForgotAuthDto) {
    try {
      const { email } = forgotAuthDto;

      const user: UserEntity = await this.authRepository.findOne({
        where: { email },
      });
      if (!user) throw new NotFoundException('USER_NOT_EXISTS');
      const recoverCode = generateRandomCode();
      user.recoverCode = recoverCode;
      this.authRepository.save(user);
      this.eventEmitter.emit('email.forgot.password', {
        user,
        recoverCode,
      });

      return { msg: 'RESET_EMAIL_SENT' };
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(resetPasswordAuthDto: ResetPasswordAuthDto) {
    try {
      const { code, password } = resetPasswordAuthDto;
      const user: UserEntity = await this.authRepository.findOne({
        where: { recoverCode: code },
      });

      if (!user) throw new NotFoundException('USER_NOT_EXISTS');

      user.password = await hashPassword(password);
      user.recoverCode = null;

      this.eventEmitter.emit('email.change.password', { user });

      return this.authRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async tokenSing(user: UserEntity): Promise<string> {
    const { id, email, names } = user;
    const payload: JwtPayload = { id, email, names };
    const token: string = await this.jwtService.sign(payload);

    return token;
  }
}
