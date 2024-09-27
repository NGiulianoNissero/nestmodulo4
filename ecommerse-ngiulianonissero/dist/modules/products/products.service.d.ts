import { ProductsRepository } from './products.repository';
import { EProduct } from '../../entities/products.entity';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { CreateProductDto } from './dto/createProduct.dto';
import { DataSource } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';
export declare class ProductsService {
    private productsRepository;
    private categoriesService;
    private dataSource;
    constructor(productsRepository: ProductsRepository, categoriesService: CategoriesService, dataSource: DataSource);
    getProducts(page: number, limit: number): Promise<EProduct[]>;
    getProductById(id: string): Promise<EProduct>;
    createProduct(body: CreateProductDto): Promise<EProduct>;
    updateProduct(body: UpdateProductDto, id: string): Promise<EProduct>;
    deleteProduct(id: string): Promise<EProduct>;
    preloadProducts(): Promise<EProduct[]>;
}
