import { EVENT_MESSAGE } from '@common/constants/message-event';
import { PayloadChangePassword } from '@modules/auth/models/change-password.type';
import { PayloadForgotPassword } from '@modules/auth/models/forgot-password.type';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthMailService } from './auth-mail.service';

@Injectable()
export class HandleAuthMailService {
  constructor(private authMailService: AuthMailService) {}

  @OnEvent(EVENT_MESSAGE.FORGOT_PASSWORD)
  async handleForgotPassword(payload: PayloadForgotPassword) {
    const { user, recoverCode } = payload;
    await this.authMailService.sendForgotPassword(user, recoverCode);
  }

  @OnEvent(EVENT_MESSAGE.CHANGE_PASSWORD)
  async handleChangePassword(payload: PayloadChangePassword) {
    const { user } = payload;
    await this.authMailService.sendChangePassword(user);
  }
}
