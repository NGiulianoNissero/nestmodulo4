import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El email debe ser un email valido.' })
  email?: string;

  @IsOptional()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'La contraseña debe tener entre 8 y 15 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*).',
  })
  password?: string;

  @IsOptional()
  @IsString({ message: 'La direccion debe ser una cadena de texto.' })
  @Length(3, 80, {
    message: 'La dirección debe tener entre 3 y 80 caracteres.',
  })
  address?: string;

  @IsOptional()
  @IsNumber({}, { message: 'El número de teléfono debe ser un número.' })
  phone?: number;

  @IsOptional()
  @IsString({ message: 'El pais debe ser una cadena de texto.' })
  @Length(5, 20, { message: 'El país debe tener entre 5 y 20 caracteres.' })
  country?: string | undefined;

  @IsOptional()
  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @Length(5, 20, { message: 'La ciudad debe tener entre 5 y 20 caracteres.' })
  city?: string | undefined;
}
