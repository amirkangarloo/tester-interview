import { Controller, Get, Headers } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'دریافت لیست محصولات' })
  getProducts(@Headers('token') token: string) {
    this.db.validateUserToken(token);
    return this.productService.getProducts();
  }
}
