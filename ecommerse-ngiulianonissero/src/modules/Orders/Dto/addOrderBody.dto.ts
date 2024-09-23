import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { AddOrderDto } from './addOrder.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddOrderBodyDto {
  /**
   * El id del usuario debe ser un UUID.
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'El uuid del usuario es requerido.' })
  @IsUUID('4', { message: 'El uuid del usuario debe ser un UUID valido.' })
  userId: string;

  /**
   * Los productos deben ser un array con objetos donde cada objeto debe tener el uuid del producto.
   * @example [{id: 'product-1'},{id: 'product-2'}, {id: 'product-3'}]
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'El array de productos es requerido.' })
  @IsArray({ message: 'Productos debe ser un array.' })
  @ArrayMinSize(1, { message: 'Debe haber almenos un producto en el array.' })
  @ValidateNested({ each: true })
  @Type(() => AddOrderDto)
  products: AddOrderDto[];
}
