import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private orderModel: typeof Order) {}

  async createOrder(orderData: {
    userEmail: string;
    items: any[];
    totalAmount: number;
  }) {
    const order = await this.orderModel.create({
      userEmail: orderData.userEmail,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      status: 'pending'
    });
    return order;
  }

  async getOrders() {
    return this.orderModel.findAll({
      order: [['createdAt', 'DESC']]
    });
  }

  async getOrder(id: string) {
    return this.orderModel.findByPk(id);
  }

  async getUserOrders(userEmail: string) {
    return this.orderModel.findAll({
      where: { userEmail },
      order: [['createdAt', 'DESC']]
    });
  }

  async getUserOrdersAndDelete(userEmail: string) {
    await this.orderModel.destroy({ where: { userEmail } });
    return {message: 'Orders deleted'};
  }

  async getHello(){
    return 'Hello World';
  }
}
    