import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  /**
   * El nombre es opcional, debe tener entre 3 y 80 caracteres.
   * @example Pedro
   */
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  name?: string;
  /**
   * El correo es opcional y debe ser un correo valido.
   * @example example@yahoo.com
   */
  @ApiProperty()
  @IsOptional()
  @IsEmail({}, { message: 'El email debe ser un email valido.' })
  email?: string;

  /**
   * La contraseña es opcional, debe tener entre 8 y 15 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).
   * @example Password675*
   */
  @ApiProperty()
  @IsOptional()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe tener entre 8 y 15 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password?: string;

  /**
   * La direccion es opciona, debe tener entre 3 y 80 caracteres.
   * @example '5678 Calle Pan'
   */
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'La direccion debe ser una cadena de texto.' })
  @Length(3, 80, {
    message: 'La dirección debe tener entre 3 y 80 caracteres.',
  })
  address?: string;

  /**
   * El telefono es opcional y debe ser un numero.
   * @example 2643547865
   */
  @ApiProperty()
  @IsOptional()
  @IsNumber({}, { message: 'El número de teléfono debe ser un número.' })
  phone?: number;

  /**
   * El pais es opcional, debe tener entre 5 y 20 caracteres.
   * @example Chile
   */
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'El pais debe ser una cadena de texto.' })
  @Length(5, 20, { message: 'El país debe tener entre 5 y 20 caracteres.' })
  country?: string | undefined;

  /**
   * La ciudad es opcional, debe tener entre 5 y 20 caracteres.
   * @example 'Buenos Aires'
   */
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @Length(5, 20, { message: 'La ciudad debe tener entre 5 y 20 caracteres.' })
  city?: string | undefined;
}
