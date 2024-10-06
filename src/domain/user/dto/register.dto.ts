import { IsNotEmpty, IsString, MaxLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    name: 'firstName',
    type: String,
    example: 'امیر',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    name: 'lastName',
    type: String,
    example: 'کنگرلو',
  })
  @IsString()
  // optional error
  lastName: string;

  @ApiProperty({
    name: 'phoneNumber',
    type: String,
    example: '09123335588',
  })
  @IsString()
  // min length error
  @MaxLength(11)
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    name: 'password',
    type: String,
    example: '@Aa112233@',
  })
  @IsString()
  // min pass 8 char error
  @IsNotEmpty()
  password: string;
}
