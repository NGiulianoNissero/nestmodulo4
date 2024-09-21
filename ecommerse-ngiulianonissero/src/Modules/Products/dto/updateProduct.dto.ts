import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProductDto {
  /**
   * El nombre es opcional, debe ser una cadena de caracteres.
   * @example Pan
   */
  @ApiProperty()
  @IsOptional()
  @IsString({
    message:
      'El nombre del producto debe ser una cadena de caracteres (texto).',
  })
  name?: string;

  /**
   * La descripcion es opcional, debe ser una cadena de caracteres.
   * @example 'Que rico pansito'
   */
  @ApiProperty()
  @IsOptional()
  @IsString({
    message:
      'La descripcion del producto debe ser una cadena de caracteres (texto).',
  })
  description?: string;

  /**
   * El precio es opcional, debe ser un numero.
   * @example 200
   */
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price?: number;

  /**
   * El stock es opcional, debe ser un numero
   * @example Comida
   */
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  stock?: number;

  /**
   * La url de la imagen es opcional, debe ser una cadena de caracteres ademas de una url.
   * @example 'http://example.com/image.png'
   */
  @ApiProperty()
  @IsOptional()
  @IsString({
    message:
      'La imagen del producto debe ser una cadena de caracteres (texto).',
  })
  @IsUrl()
  imgUrl?: string;
}
