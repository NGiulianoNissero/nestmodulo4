import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class CreateProductValidation implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { name, description, price, stock, imgUrl } = req.body;

    if (!name) {
      throw new BadRequestException('El nombre del producto debe estar.');
    } else if (typeof name !== 'string') {
      throw new BadRequestException(
        'El nombre del producto debe ser una cadena de caracteres (texto)',
      );
    }

    if (!description) {
      throw new BadRequestException('La descripcion del producto debe estar.');
    } else if (typeof description !== 'string') {
      throw new BadRequestException(
        'La descripcion del producto debe ser una cadena de caracteres (texto)',
      );
    }

    if (!price) {
      throw new BadRequestException('El precio del producto debe estar.');
    } else if (typeof name !== 'number') {
      throw new BadRequestException(
        'El precio del producto debe ser un numero.',
      );
    }

    if (!stock) {
      throw new BadRequestException('El stock debe estar.');
    } else if (typeof stock !== 'boolean') {
      throw new BadRequestException('El stock debe ser verdadero o falso.');
    }

    if (!imgUrl) {
      throw new BadRequestException('La url de la imagen debe estar.');
    } else if (typeof imgUrl !== 'string') {
      throw new BadRequestException(
        'La url de la imagen debe ser una cadena de caracteres (texto).',
      );
    }

    next();
  }
}
