import { FilesManagerRepository } from './filesManager.repository';
import { ProductsService } from '../products/products.service';
export declare class FilesManagerService {
    private filesManagerRepository;
    private productsService;
    constructor(filesManagerRepository: FilesManagerRepository, productsService: ProductsService);
    uploadImage(id: string, file: Express.Multer.File): Promise<{
        message: string;
        imgUrl: string;
    }>;
}
