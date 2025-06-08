import AttendancesList from '@/components/AttendancesList/AttendancesList';
import CustomerInformation from '@/elements/CustomerInformation/CustomerInformation';
import { CustomerDTO } from '@/model/dto/CustomerDTO';
import { UserDTO } from '@/model/dto/UserDTO';
import { CustomerService } from '@/services/CustomerService';
import { UserService } from '@/services/UserService';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const AttendanceHistory = () => {
    const searchParams = useSearchParams();
    const customerId = searchParams.get('id');

    const [customer, setCustomerInformation] = useState<CustomerDTO>();
    const [users, setUsers] = useState<UserDTO[]>();

    useEffect(() => {
        const getCustomerInformation = async () => {
            if (customerId) {
                try {
                    const customerInformation: CustomerDTO = await CustomerService.getCustomerInformationById(customerId);

                    setCustomerInformation(customerInformation);
                } catch (e) {
                    console.error(e);
                }
            }
        };

        getCustomerInformation();
    }, [customerId]);

    useEffect(() => {
        const getUserInformation = async () => {
            try {
                const users: UserDTO[] = await UserService.getAll();

                setUsers(users);
            } catch (e) {
                console.error(e);
            }
        };

        getUserInformation();
    }, []);

    if (customer && users) {
        return (
            <div>
                <CustomerInformation customer={customer} />
                <AttendancesList users={users} attendances={customer.attendances} />
            </div>
        );
    } else {
        return <>Não foi possível carregar as informações desejadas.</>;
    }
};

export default AttendanceHistory;
