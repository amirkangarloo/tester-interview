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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'لیست سفارش های کاربر' })
  getOrders(@Headers('token') token: string) {
    this.db.validateUserToken(token);
    return this.orderService.getOrders();
  }

  @Get('/:orderId')
  @ApiOperation({ summary: 'دریافت یک سفارش با ایدی' })
  getOrder(@Param('orderId') orderId: string, @Headers('token') token: string) {
    this.db.validateUserToken(token);
    return this.orderService.getOrder(orderId);
  }

  @Post('')
  @ApiOperation({ summary: 'ایجاد سفارش جدید' })
  createOrder(@Body() body: CreateOrderDto, @Headers('token') token: string) {
    const { id } = this.db.validateUserToken(token);
    return this.orderService.createOrder(id, body);
  }

  @Put('/:orderId/pay')
  @ApiOperation({ summary: 'پرداخت سفارش' })
  payOrder(@Param('orderId') orderId: string, @Headers('token') token: string) {
    this.db.validateUserToken(token);
    return this.orderService.payOrder(orderId);
  }

  @Delete('/:orderId')
  @ApiOperation({ summary: 'حذف سفارش پرداخت نشده' })
  deleteOrder(
    @Param('orderId') orderId: string,
    @Headers('token') token: string,
  ) {
    this.db.validateUserToken(token);
    return this.orderService.deleteOrder(orderId);
  }
}
