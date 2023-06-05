import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailService } from './email.service';
import { PayloadForgotPassword } from '../models/forgot-password.type';
import { PayloadChangePassword } from '../models/change-password.type';

@Injectable()
export class HandleEmailService {
  constructor(private emailService: EmailService) {}

  @OnEvent('email.forgot.password')
  async handleForgotPassword(payload: PayloadForgotPassword) {
    const { user, recoverCode } = payload;
    await this.emailService.sendForgotPassword(user, recoverCode);
  }

  @OnEvent('email.change.password')
  async handleChangePassword(payload: PayloadChangePassword) {
    const { user } = payload;
    await this.emailService.sendChangePassword(user);
  }
}
