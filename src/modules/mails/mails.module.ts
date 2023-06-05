import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthMailService } from './services/auth-mail/auth-mail.service';
import { HandleAuthMailService } from './services/auth-mail/handle-auth-mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: {
          host: process.env.MAIL_HOST,
          secure: process.env.MAIL_SECURE === 'true',
          port: 465,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
        },
        defaults: {
          from: `"Reto Game" <${process.env.MAIL_FROM}>`,
          bcc: `${process.env.MAIL_BCC}`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [HandleAuthMailService, AuthMailService],
  providers: [HandleAuthMailService, AuthMailService],
})
export class MailsModule {}
