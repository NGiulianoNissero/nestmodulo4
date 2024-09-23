import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { EUser } from './users.entity';
import { EOrderDetails } from './orderDetails.entity';

@Entity({ name: 'orders' })
export class EOrder {
  @PrimaryGeneratedColumn('uuid')
  id?: string = uuid();

  @Column()
  date: Date;

  @ManyToOne(() => EUser, (user) => user.orders)
  user: EUser;

  @OneToOne(() => EOrderDetails, (orderDetails) => orderDetails.order)
  @JoinColumn()
  orderDetails?: EOrderDetails;
}
