import { EProduct } from '../../entities/products.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { CategoriesService } from '../categories/categories.service';
export declare class ProductsRepository {
    private productRepository;
    private categoriesService;
    private dataSource;
    constructor(productRepository: Repository<EProduct>, categoriesService: CategoriesService, dataSource: DataSource);
    private productsHD;
    private products;
    getProducts(page: number, limit: number): Promise<EProduct[]>;
    getProductById(id: string): Promise<EProduct>;
    createProduct(product: EProduct, queryRunner: QueryRunner): Promise<EProduct>;
    updateProduct(body: UpdateProductDto, id: string): Promise<void>;
    deleteProduct(id: string): Promise<void>;
    preloadProducts(): Promise<EProduct[]>;
}
