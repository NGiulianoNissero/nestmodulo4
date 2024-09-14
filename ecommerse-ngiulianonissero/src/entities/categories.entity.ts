import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { EProduct } from './products.entity';

@Entity({ name: 'categories' })
export class ECategory {
  @PrimaryGeneratedColumn('uuid')
  id?: string = uuid();

  @Column({ length: 50, nullable: false })
  name: string;

  @OneToMany(() => EProduct, (product) => product.category)
  products?: EProduct[];
}
