import { Controller, Delete, Get, Headers, Post, Put } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { OrderService } from 'src/domain/order/order.service';

@Controller({ path: 'order' })
export class OrderController {
  constructor(
    private readonly db: DbService,
    private readonly orderService: OrderService,
  ) {}

  @Get()
  getOrders(@Headers('authorization') authorization: string) {
    this.db.validateUserToken(authorization);
  }

  @Get('/:orderId')
  getOrder(@Headers('authorization') authorization: string) {
    this.db.validateUserToken(authorization);
  }

  @Post('')
  createOrder(@Headers('authorization') authorization: string) {
    this.db.validateUserToken(authorization);
  }

  @Put('/:orderId/pay')
  payOrder(@Headers('authorization') authorization: string) {
    this.db.validateUserToken(authorization);
  }

  @Delete('/:orderId')
  deleteOrder(@Headers('authorization') authorization: string) {
    this.db.validateUserToken(authorization);
  }
}
