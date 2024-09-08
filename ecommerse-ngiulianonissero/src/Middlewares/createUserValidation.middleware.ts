import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CreateUserValidation implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { email, name, password, address, phone, country, city } = req.body;

    if (!email) {
      throw new BadRequestException('El email debe estar.');
    } else if (typeof email !== 'string') {
      throw new BadRequestException(
        'El email debe ser una cadena de caracteres (texto).',
      );
    }

    if (!name) {
      throw new BadRequestException('El nombre debe estar.');
    } else if (typeof name !== 'string') {
      throw new BadRequestException(
        'El nombre debe ser una cadena de caracteres (texto).',
      );
    }

    if (!password) {
      throw new BadRequestException('La contraseña debe estar.');
    } else if (typeof password !== 'string') {
      throw new BadRequestException(
        'La contraseña debe ser una cadena de caracteres (texto).',
      );
    }

    if (!address) {
      throw new BadRequestException('La direccion debe estar.');
    } else if (typeof address !== 'string') {
      throw new BadRequestException(
        'La direccion debe ser una cadena de caracteres (texto).',
      );
    }

    if (!phone) {
      throw new BadRequestException('El numero de telefono debe estar.');
    } else if (typeof phone !== 'number') {
      throw new BadRequestException(
        'El numero de telefono debe ser un numero.',
      );
    }

    if (typeof country !== 'string') {
      throw new BadRequestException(
        'El pais debe ser una cadena de caracteres (texto).',
      );
    }

    if (typeof city !== 'string') {
      throw new BadRequestException(
        'La ciudad debe ser una cadena de caracteres (texto).',
      );
    }

    next();
  }
}
