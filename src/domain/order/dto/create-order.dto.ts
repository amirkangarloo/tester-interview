import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsUUID,
  Min,
  MinLength,
  ValidateNested,
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class productOrderDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  count: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @MinLength(1)
  @Type(() => productOrderDto)
  productList: productOrderDto[];
}
