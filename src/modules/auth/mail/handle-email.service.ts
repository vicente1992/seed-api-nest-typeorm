import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailService } from './email.service';
import { PayloadForgotPassword } from '../models/forgot-password.type';
import { PayloadChangePassword } from '../models/change-password.type';
import { EVENT_MESSAGE } from '@common/constants/message-event';

@Injectable()
export class HandleEmailService {
  constructor(private emailService: EmailService) {}

  @OnEvent(EVENT_MESSAGE.FORGOT_PASSWORD)
  async handleForgotPassword(payload: PayloadForgotPassword) {
    const { user, recoverCode } = payload;
    await this.emailService.sendForgotPassword(user, recoverCode);
  }

  @OnEvent(EVENT_MESSAGE.CHANGE_PASSWORD)
  async handleChangePassword(payload: PayloadChangePassword) {
    const { user } = payload;
    await this.emailService.sendChangePassword(user);
  }
}
