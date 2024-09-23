import { UpdateUserDto } from './dto/updateUser.dto';
import { EUser } from '../../entities/users.entity';
import { Repository } from 'typeorm';
export declare class UsersRepository {
    private userRepository;
    constructor(userRepository: Repository<EUser>);
    getUsers(): Promise<EUser[]>;
    getUserById(id: string): Promise<EUser>;
    createUser(user: EUser): Promise<EUser>;
    updateUser(body: UpdateUserDto, id: string): Promise<EUser>;
    deleteUser(id: string): Promise<EUser>;
    getUserByEmail(email: string): Promise<EUser | null>;
}
