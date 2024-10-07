import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DbService } from 'src/db/db.service';
import { ProductService } from 'src/domain/product/product.service';

@Controller({ path: 'product' })
@ApiTags('Product')
export class ProductController {
  private counter = 0;
  constructor(
    private readonly db: DbService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'دریافت لیست محصولات' })
  getProducts() {
    this.counter++;
    if (this.counter % 5 === 0) {
      throw new InternalServerErrorException('you found new error :)');
    }
    return this.productService.getProducts();
  }
}
