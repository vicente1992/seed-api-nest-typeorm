import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsNotEmpty } from 'class-validator';

export class ResetPasswordAuthDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty()
  @Length(6, 20)
  password: string;
}
