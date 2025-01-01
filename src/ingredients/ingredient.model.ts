import { Column, DataType, Model, Table } from 'sequelize-typescript';


@Table
export class Ingredient extends Model<Ingredient> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Optional: Auto-increment if you want integers
      })
      key: number;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true, // Ensures 'id' field is unique
      })
      id: string;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      name: string;
    
      @Column({
        type: DataType.FLOAT,
        allowNull: false,
        defaultValue: 0,
      })
      price: number;
    
      @Column({
        type: DataType.STRING,
        allowNull: false,
      })
      image: string;
    
      @Column({
        type: DataType.STRING,
        allowNull: true,
      })
      category: string; // To categorize as 'sauce', 'cheese', or 'topping' 

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