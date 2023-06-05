import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotAuthDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
