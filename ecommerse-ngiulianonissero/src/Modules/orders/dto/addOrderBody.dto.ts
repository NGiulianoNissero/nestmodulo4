import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { AddOrderDto } from './addOrder.dto';

export class AddOrderBodyDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  products: Array<AddOrderDto>;
}
