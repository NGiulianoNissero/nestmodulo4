import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { EOrder } from './orders.entity';

@Entity({ name: 'users' })
export class EUser {
  @PrimaryGeneratedColumn('uuid')
  id?: string = uuid();

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 50, nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'bigint' })
  phone: number;

  @Column()
  address: string;

  @Column({ length: 50, nullable: true })
  country?: string;

  @Column({ length: 50, nullable: true })
  city?: string;

  @OneToMany(() => EOrder, (order) => order.user)
  orders?: EOrder[];
}
