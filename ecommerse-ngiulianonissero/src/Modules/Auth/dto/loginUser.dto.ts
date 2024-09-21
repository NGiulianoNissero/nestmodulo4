import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  /**
   * El email debe ser una cadena de caracteres y un email valido.
   * @example example@gmail.com
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'El email es requerido.' })
  @IsEmail({}, { message: 'El email debe ser un email valido.' })
  email: string;

  /**
   * La contraseña debe ser una cadena de caracteres.
   * @example Admin123!
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'La contraseña es requerida.' })
  password: string;
}
