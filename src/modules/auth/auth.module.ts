import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserEntity } from './entities/user.entity';
import { MailsModule } from '@modules/mails/mails.module';
import { HandleEmailService } from './mail/handle-email.service';
import { EmailService } from './mail/email.service';

@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule.forRoot(),
    // TODO:Agregar .env global
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
    MailsModule,
  ],
  providers: [AuthService, JwtStrategy, EmailService, HandleEmailService],
  exports: [JwtStrategy, PassportModule, AuthService],
})
export class AuthModule {}
