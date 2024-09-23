import { FilesManagerService } from './filesManager.service';
export declare class FilesManagerController {
    private filesManagerService;
    constructor(filesManagerService: FilesManagerService);
    uploadImage(file: Express.Multer.File, id: string): Promise<{
        message: string;
        imgUrl: string;
    }>;
}
