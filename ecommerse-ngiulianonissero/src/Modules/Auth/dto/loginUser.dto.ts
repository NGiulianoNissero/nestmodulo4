import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'El email es requerido.' })
  @IsEmail({}, { message: 'El email debe ser un email valido.' })
  email: string;

  @IsNotEmpty({ message: 'La contraseña es requerida.' })
  password: string;
}
