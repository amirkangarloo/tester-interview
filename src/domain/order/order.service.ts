import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { CreateOrderDto } from 'src/domain/order/dto';

@Injectable()
export class OrderService {
  constructor(private db: DbService) {}

  getOrders() {
    return this.db.getOrders();
  }

  getOrder(orderId: string) {
    return this.db.getOrderById(orderId);
  }

  createOrder(userId: string, body: CreateOrderDto) {
    return this.db.createOrder(userId, body);
  }

  payOrder(orderId: string) {
    return this.db.paidOrder(orderId);
  }

  deleteOrder(orderId: string) {
    return this.db.deleteOrder(orderId);
  }
}
