import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    name: 'phoneNumber',
    type: String,
    example: '09123335588',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    name: 'password',
    type: String,
    example: '@Aa112233@',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
