import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/updateUser.dto';
import { EUser } from '../../entities/users.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    getUsers(): Promise<EUser[]>;
    getUserById(id: string): Promise<EUser>;
    signUp(user: EUser): Promise<EUser>;
    updateUser(body: UpdateUserDto, id: string): Promise<EUser>;
    deleteUser(id: string): Promise<EUser>;
    getUserByEmail(email: string): Promise<EUser | null>;
}
