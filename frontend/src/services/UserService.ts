import { RequestHelper } from '@/helpers/RequestHelper';
import { UserDTO } from '@/model/dto/UserDTO';

export class UserService {
    public static async getAll(): Promise<UserDTO[]> {
        const users: UserDTO[] | undefined = await RequestHelper.get('/users');

        if (users) {
            return users;
        }

        return [];
    }
}
