import {
  Column,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { EOrder } from './orders.entity';
import { EProduct } from './products.entity';

@Entity({ name: 'orderdetails' })
export class EOrderDetails {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  price: number;

  @OneToOne(() => EOrder, (order) => order.orderDetails)
  order: EOrder;

  @ManyToMany(() => EProduct, (product) => product.orderDetails)
  product: EProduct[];
}
