import { RequestHelper } from '@/helpers/RequestHelper';
import { CreateCustomerDTO } from '@/model/dto/CreateUserDTO';
import { CustomerDTO } from '@/model/dto/CustomerDTO';

export class CustomerService {
    public static async createCustomer(name: string, email: string, phone: string): Promise<void> {
        const createUserDTO: CreateCustomerDTO = {
            name: name,
            email: email,
            phone: phone,
        };

        await RequestHelper.post('/customers', createUserDTO);
    }

    public static async getAllCustomers(): Promise<CustomerDTO[]> {
        const customers: CustomerDTO[] | undefined = await RequestHelper.get('/customers');

        if (customers) {
            return customers;
        }

        return [];
    }

    public static async getCustomerInformationById(customerId: string): Promise<CustomerDTO> {
        const customerInformation: CustomerDTO | undefined = await RequestHelper.get('/customers/information/' + customerId);

        if (!customerInformation) throw new Error('Customer not found');

        return customerInformation;
    }
}
