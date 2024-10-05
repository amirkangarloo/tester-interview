import { IsInt, IsNotEmpty, IsUUID, Min } from '@nestjs/class-validator';

export class ChargeWalletDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  amount: number;
}
