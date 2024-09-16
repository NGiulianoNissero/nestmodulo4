import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
const toStream = require('buffer-to-stream');

@Injectable()
export class FilesManagerRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else if (result) {
            resolve(result);
          } else {
            reject(
              new BadRequestException('Resultado de subida es indefinido.'),
            );
          }
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}
