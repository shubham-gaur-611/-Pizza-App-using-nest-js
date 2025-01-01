import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Order extends Model<Order> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userEmail: string;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  items: any[];

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  totalAmount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'pending',
  })
  status: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}
