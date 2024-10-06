import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DbService } from 'src/db/db.service';
import { CreateOrderDto } from 'src/domain/order/dto';
import { OrderService } from 'src/domain/order/order.service';

@Controller({ path: 'order' })
@ApiTags('Order')
export class OrderController {
  constructor(
    private readonly db: DbService,
    private readonly orderService: OrderService,
  ) {}

  @Get()
  getOrders(@Headers('authorization') authorization: string) {
    this.db.validateUserToken(authorization);
    return this.orderService.getOrders();
  }

  @Get('/:orderId')
  getOrder(
    @Param('orderId') orderId: string,
    @Headers('authorization') authorization: string,
  ) {
    this.db.validateUserToken(authorization);
    return this.orderService.getOrder(orderId);
  }

  @Post('')
  createOrder(
    @Body() body: CreateOrderDto,
    @Headers('authorization') authorization: string,
  ) {
    const { id } = this.db.validateUserToken(authorization);
    return this.orderService.createOrder(id, body);
  }

  @Put('/:orderId/pay')
  payOrder(
    @Param('orderId') orderId: string,
    @Headers('authorization') authorization: string,
  ) {
    this.db.validateUserToken(authorization);
    return this.orderService.payOrder(orderId);
  }

  @Delete('/:orderId')
  deleteOrder(
    @Param('orderId') orderId: string,
    @Headers('authorization') authorization: string,
  ) {
    this.db.validateUserToken(authorization);
    return this.orderService.deleteOrder(orderId);
  }
}
