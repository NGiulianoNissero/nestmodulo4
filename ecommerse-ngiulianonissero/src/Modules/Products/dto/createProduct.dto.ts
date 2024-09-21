import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  /**
   * El nombre debe ser una cadena de caracteres.
   * @example Queso
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre del producto debe estar' })
  @IsString({
    message:
      'El nombre del producto debe ser una cadena de caracteres (texto).',
  })
  name: string;

  /**
   * La descripcion debe ser una cadena de caracteres.
   * @example 'El queso es muy rico.'
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'La descripcion del producto debe estar' })
  @IsString({
    message:
      'La descripcion del producto debe ser una cadena de caracteres (texto).',
  })
  description: string;

  /**
   * El precio debe ser un numero.
   * @example 500.00
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'El precio del producto debe estar' })
  @IsNumber()
  price: number;

  /**
   * El stock debe ser un numero.
   * @example 20
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'El stock del producto debe estar' })
  @IsNumber()
  stock: number;

  /**
   * La categoria debe ser una cadena de caracteres.
   * @example Comida
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'La categoria del producto debe estar' })
  @IsString({
    message:
      'La categoria del producto debe ser una cadena de caracteres (texto).',
  })
  category: string;
}
