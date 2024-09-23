import { EUser } from '../../entities/users.entity';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    signUp(user: EUser): Promise<{
        id?: string;
        name: string;
        email: string;
        phone: number;
        address: string;
        country?: string;
        city?: string;
        orders?: import("../../entities/orders.entity").EOrder[];
    }>;
    signIn(email: string, password: string): Promise<{
        message: string;
        token: string;
    }>;
}
