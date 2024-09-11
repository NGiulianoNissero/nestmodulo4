import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const Authorization: string = request.headers['authorization'];

    if (!Authorization)
      throw new UnauthorizedException('No existe una autorizacion.');

    const AuthorizationClear: string = Authorization.replace('Basic: ', '');
    const [email, password] = AuthorizationClear.split(':');

    if (!email) throw new UnauthorizedException('No existe el correo.');
    if (!password) throw new UnauthorizedException('No existe la contraseña.');

    return true;
  }
}
