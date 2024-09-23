import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  /**
   * El nombre debe tener entre 3 y 80 caracteres.
   * @example Giuliano
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre es requerido.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  name: string;

  /**
   * El correo debe ser un correo valido.
   * @example example@gmail.com
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'El email es requerido.' })
  @IsEmail({}, { message: 'El email debe ser un email valido.' })
  email: string;

  /**
   * La contraseña debe tener entre 8 y 15 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).
   * @example Admin123!
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'La contraseña es requerida.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe tener entre 8 y 15 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password: string;

  /**
   * La contraseña de confirmacion debe ser igual que la contraseña.
   * @example Admin123!
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  passwordConfirmation: string;

  /**
   * La direccion debe tener entre 3 y 80 caracteres.
   * @example '123 Calle Queso'
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'La direccion es requerida.' })
  @IsString({ message: 'La direccion debe ser una cadena de texto.' })
  @Length(3, 80, {
    message: 'La dirección debe tener entre 3 y 80 caracteres.',
  })
  address: string;

  /**
   * El telefono debe ser un numero.
   * @example 2647847865
   */
  @ApiProperty()
  @IsNotEmpty({ message: 'El numero de telefono es requerido.' })
  @IsNumber({}, { message: 'El número de teléfono debe ser un número.' })
  phone: number;

  /**
   * El pais es opcional, debe tener entre 5 y 20 caracteres.
   * @example Argentina
   */
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'El pais debe ser una cadena de texto.' })
  @Length(5, 20, { message: 'El país debe tener entre 5 y 20 caracteres.' })
  country?: string | undefined;

  /**
   * La ciudad es opcional, debe tener entre 5 y 20 caracteres.
   * @example 'San Juan'
   */
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @Length(5, 20, { message: 'La ciudad debe tener entre 5 y 20 caracteres.' })
  city?: string | undefined;

  /**
   * El role admin es opcional, por defecto es falso, se puede colocar la propiedad si se desea crear un usuario administrador.
   * @default false
   */
  @ApiProperty({ default: false })
  @IsOptional()
  @IsBoolean({ message: 'El rol admin debe ser un booleano.' })
  isAdmin?: boolean;
}
