import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class UpdateValidation implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    if (!name) {
      throw new BadRequestException('El nombre debe estar.');
    } else if (typeof name !== 'string') {
      throw new BadRequestException(
        'El nombre debe ser una cadena de caracteres (texto).',
      );
    }

    next();
  }
}
