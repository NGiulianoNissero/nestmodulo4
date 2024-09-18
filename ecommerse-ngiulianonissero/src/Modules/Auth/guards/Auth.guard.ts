import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JWT_SECRET } from '../../../config/envs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    //! Autenticacion por "Basic: <email>:<password>"
    // const Authorization: string | undefined = request.headers['authorization'];

    // if (!Authorization)
    //   throw new UnauthorizedException('No existe una autorizacion.');

    // const AuthorizationClear: string = Authorization.replace('Basic: ', '');
    // const [email, password] = AuthorizationClear.split(':');

    // if (!email) throw new UnauthorizedException('No existe el correo.');
    // if (!password) throw new UnauthorizedException('No existe la contraseña.');

    // return true;

    //! Autenticacion por JSON Web Token
    const token = request.headers['authorization']?.split(' ')[1] ?? '';

    if (!token) throw new HttpException('Bearer token no encontrado.', 401);

    try {
      const secret = JWT_SECRET;

      const payload = this.jwtService.verify(token, { secret });

      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      // payload.roles = [Role.User];
      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token invalido.');
    }
  }
}
