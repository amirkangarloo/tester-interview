import { IsInt, IsNotEmpty, IsUUID, Min } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChargeWalletDto {
  @ApiProperty({
    name: 'userId',
    type: String,
    example: 'b3e416d9-20d7-4e58-80f1-cc5499933741',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    name: 'amount',
    type: Number,
    example: 2000,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  amount: number;
}
