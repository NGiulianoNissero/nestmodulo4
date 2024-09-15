import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ECategory } from './categories.entity';
import { EOrderDetails } from './orderDetails.entity';

@Entity({ name: 'products' })
export class EProduct {
  @PrimaryGeneratedColumn('uuid')
  id?: string = uuid();

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ nullable: false, type: 'text' })
  description: string;

  @Column({ type: 'decimal', nullable: false, precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: false })
  stock: number;

  @Column()
  imgUrl?: string =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmiqR_gB1aE6SmGpJvgdi6j6MZYtLpcSittA&s';

  @ManyToOne(() => ECategory, (category) => category.products)
  category: ECategory;

  @ManyToMany(() => EOrderDetails, (orderdetails) => orderdetails.products)
  @JoinTable()
  orderDetails?: EOrderDetails[];
}
