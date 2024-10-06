import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class ProductService {
  constructor(private db: DbService) {}

  getProducts() {
    const products = this.db.getProducts();
    return { products, total: products.length };
  }
}
