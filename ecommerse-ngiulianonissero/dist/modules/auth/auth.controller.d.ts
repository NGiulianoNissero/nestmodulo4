import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { CreateUserDto } from '../users/dto/createUser.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(user: CreateUserDto): Promise<{
        id?: string;
        name: string;
        email: string;
        phone: number;
        address: string;
        isAdmin?: boolean;
        country?: string;
        city?: string;
        orders?: import("../../entities/orders.entity").EOrder[];
    }>;
    signIn(body: LoginUserDto): Promise<{
        message: string;
        token: string;
    }>;
}
