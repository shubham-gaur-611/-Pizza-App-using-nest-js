import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() orderData: {
      userEmail: string;
      items: any[];
      totalAmount: number;
    }
  ) {
    return this.ordersService.createOrder(orderData);
  }

  @Get('user/:email')
  async getUserOrders(@Param('email') email: string) {
    return this.ordersService.getUserOrders(email);
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }

  @Delete('user_delete/:email')
  async getUserOrdersAndDelete(@Param('email') email: string) {
    return this.ordersService.getUserOrdersAndDelete(email);
  }

  @Get()
  async getOrders(){
    return this.ordersService.getOrders();
  }
  
}
