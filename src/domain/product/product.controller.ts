import { Controller, Get, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DbService } from 'src/db/db.service';
import { ProductService } from 'src/domain/product/product.service';

@Controller({ path: 'product' })
@ApiTags('Product')
export class ProductController {
  constructor(
    private readonly db: DbService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  getProducts(@Headers('authorization') authorization: string) {
    this.db.validateUserToken(authorization);
    return this.productService.getProducts();
  }
}
