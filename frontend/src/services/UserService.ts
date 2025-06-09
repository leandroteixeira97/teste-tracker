import { RequestHelper } from '@/helpers/RequestHelper';
import { CreateUserDTO } from '@/model/dto/CreateUserDTO';
import { UserDTO } from '@/model/dto/UserDTO';
import { Role } from '@/model/Role';

export class UserService {
    public static async getAll(): Promise<UserDTO[]> {
        const users: UserDTO[] | undefined = await RequestHelper.get('/users');

        if (users) {
            return users;
        }

        return [];
    }

    public static async createUser(name: string, email: string, password: string, role: Role): Promise<void> {
        const createUserDTO: CreateUserDTO = {
            name: name,
            email: email,
            passwordHash: password,
            role: role
        };

        await RequestHelper.post('/users', createUserDTO);
    }
}
