import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { EUser } from '../../entities/users.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<EUser[]>;
    getUserById(id: string): Promise<EUser>;
    updateUser(id: string, body: UpdateUserDto): Promise<EUser>;
    deleteUser(id: string): Promise<EUser>;
}
