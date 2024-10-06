import { Module } from '@nestjs/common';
import { ProductController } from 'src/domain/product/product.controller';
import { ProductService } from 'src/domain/product/product.service';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
