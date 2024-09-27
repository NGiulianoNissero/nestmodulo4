import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { CreateProductDto } from './dto/createProduct.dto';
import { EProduct } from '../../entities/products.entity';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getProducts(page?: number, limit?: number): Promise<EProduct[]>;
    getProductById(id: string): Promise<EProduct>;
    createProduct(body: CreateProductDto): Promise<EProduct>;
    updateProduct(id: string, body: UpdateProductDto): Promise<EProduct>;
    deleteProduct(id: string): Promise<EProduct>;
    preloadProducts(): Promise<EProduct[]>;
}
