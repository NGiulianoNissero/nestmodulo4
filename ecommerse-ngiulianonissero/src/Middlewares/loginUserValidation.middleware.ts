import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { CredentialRepository } from 'src/Modules/Auth/auth.repository';

@Injectable()
export class UserLoginValidation implements NestMiddleware {
  constructor(private credentialRepository: CredentialRepository) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email) {
      throw new BadRequestException('El email debe estar.');
    } else {
      this.credentialRepository.isRegistred(email).then((boolean) => {
        if (!boolean) {
          throw new BadRequestException('No existe un usuario con este email.');
        }
      });
    }

    if (!password) {
      throw new BadRequestException('La contraseña debe estar.');
    }

    next();
  }
}
