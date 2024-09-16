import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { AddOrderDto } from './addOrder.dto';
import { Type } from 'class-transformer';

export class AddOrderBodyDto {
  @IsNotEmpty({ message: 'El uuid del usuario es requerido.' })
  @IsUUID('4', { message: 'El uuid del usuario debe ser un UUID valido.' })
  userId: string;

  @IsNotEmpty({ message: 'El array de productos es requerido.' })
  @IsArray({ message: 'Productos debe ser un array.' })
  @ArrayMinSize(1, { message: 'Debe haber almenos un producto en el array.' })
  @ValidateNested({ each: true })
  @Type(() => AddOrderDto)
  products: AddOrderDto[];
}
