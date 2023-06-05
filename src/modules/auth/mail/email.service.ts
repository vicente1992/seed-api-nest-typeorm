import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@modules/auth/entities/user.entity';
import { join } from 'path';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendForgotPassword(user: UserEntity, token: string) {
    const { names } = user;
    console.log('path', join(__dirname, '..', '..'));
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Recuperar contraseña',
      template: join(__dirname, '..', '..', '/mails/templates/forgot.hbs'),
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
      template: join(
        __dirname,
        '..',
        '..',
        '/mails/templates/changePassword.hbs',
      ),
      context: {},
    });
  }
}
