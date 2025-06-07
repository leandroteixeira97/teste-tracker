import { RequestHelper } from '@/helpers/RequestHelper';
import { CreateCustomerDTO } from '@/model/dto/CreateUserDTO';

export class CustomerService {
    public static async createCustomer(name: string, email: string, phone: string): Promise<void> {
        const createUserDTO: CreateCustomerDTO = {
            name: name,
            email: email,
            phone: phone,
        };

        await RequestHelper.post('/customers', createUserDTO);
    }
}
