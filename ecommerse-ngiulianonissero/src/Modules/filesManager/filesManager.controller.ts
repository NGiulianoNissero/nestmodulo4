import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesManagerService } from './filesManager.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FilesManagerController {
  constructor(private filesManagerService: FilesManagerService) {}

  @Post('uploadImage/:uuid')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El archivo debe pesar menos de 200kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('uuid', new ParseUUIDPipe()) id: string,
  ) {
    return this.filesManagerService.uploadImage(id, file);
  }
}
