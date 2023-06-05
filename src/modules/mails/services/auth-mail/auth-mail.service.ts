import { UserEntity } from '@modules/auth/entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class AuthMailService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPassword(user: UserEntity, token: string) {
    const { names } = user;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Recuperar contraseña',
      template: join(__dirname, '..', '..', '/templates/forgot.hbs'),
      context: {
        names,
        token,
      },
    });
  }

  async sendChangePassword(user: UserEntity) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Se ha cambiado su contraseña',
      template: join(__dirname, '..', '..', '/templates/changePassword.hbs'),
      context: {},
    });
  }
}
