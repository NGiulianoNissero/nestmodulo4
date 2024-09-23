import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDetailsDto {
  /**
   * El id de los detalles de la orden
   * @example 123e4567-e89b-12d3-a456-426614174000
   */
  @ApiProperty()
  id: string;
}
