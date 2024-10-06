import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsUUID,
  Min,
  MinLength,
  ValidateNested,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class productOrderDto {
  @ApiProperty({
    name: 'id',
    type: String,
    example: 'b3e416d9-20d7-4e58-80f1-cc5499933741',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @ApiProperty({
    name: 'count',
    type: Number,
    example: 2,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  count: number;
}

export class CreateOrderDto {
  @ApiProperty({
    name: 'productList',
    type: [productOrderDto],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @MinLength(1)
  @Type(() => productOrderDto)
  productList: productOrderDto[];
}
