import { UploadApiResponse } from 'cloudinary';
export declare class FilesManagerRepository {
    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>;
}
