import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { envConfiguration } from '@config/env.config';
import { AuthModule } from '@modules/auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MailsModule } from './modules/mails/mails.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfiguration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    MailsModule,
  ],
  providers: [],
})
export class AppModule {}
