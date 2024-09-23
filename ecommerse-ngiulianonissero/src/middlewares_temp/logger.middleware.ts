import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Url: ${req.url}, Metodo: ${req.method}, Fecha y Hora: ${new Date().toLocaleString()}`,
    );

    next();
  }
}
