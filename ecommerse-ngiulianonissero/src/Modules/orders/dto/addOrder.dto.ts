import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddOrderDto {
  /**
   * El id debe ser un UUID.
   * @example 550e8400-e29b-41d4-a716-446655440000
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'El uuid del producto es requerido.' })
  @IsUUID('4', { message: 'El uuid del producto debe ser un uuid valido.' })
  id: string;
}
