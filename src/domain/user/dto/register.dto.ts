import { IsNotEmpty, IsString, MaxLength } from '@nestjs/class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  // optional error
  lastName: string;

  @IsString()
  // min length error
  @MaxLength(11)
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  // min pass 8 char error
  @IsNotEmpty()
  password: string;
}
