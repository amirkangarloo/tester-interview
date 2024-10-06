import { Module } from '@nestjs/common';
import { OrderController } from 'src/domain/order/order.controller';
import { OrderService } from 'src/domain/order/order.service';

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
