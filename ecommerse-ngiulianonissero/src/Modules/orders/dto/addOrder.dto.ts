import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddOrderDto {
  @IsNotEmpty({ message: 'El uuid del producto es requerido.' })
  @IsUUID('4', { message: 'El uuid del producto debe ser un uuid valido.' })
  id: string;
}
