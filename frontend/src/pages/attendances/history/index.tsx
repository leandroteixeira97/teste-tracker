import AttendancesList from '@/components/AttendancesList/AttendancesList';
import CustomerInformation from '@/elements/CustomerInformation/CustomerInformation';
import { CustomerDTO } from '@/model/dto/CustomerDTO';
import { UserDTO } from '@/model/dto/UserDTO';
import { CustomerService } from '@/services/CustomerService';
import { UserService } from '@/services/UserService';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Styles from './index.module.scss';
import { useRouter } from 'next/router';
import Button from '@/elements/Button/Buttons';
import CustomerSearchInput from '@/elements/CustomerSearchInput/CustomerSearchInput';
import TrackerLogo from '@/elements/TrackerLogo/TrackerLogo';

const AttendanceHistory = () => {
    const router = useRouter();

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
            <div className={Styles.attendancesHistoryPage}>
                <div className={Styles.attendancesHistoryContainer}>
                    <TrackerLogo />

                    <CustomerSearchInput
                        id="customer_search_input"
                        label="Pesquisar outro cliente"
                        placeholder="Digite o nome ou e-mail do cliente"
                        onSelectedValueChange={(customer?: CustomerDTO) => {
                            if (customer) {
                                router.push('/attendances/history?id=' + customer.id);
                            }
                        }}
                    />

                    <CustomerInformation customer={customer} />

                    <hr />

                    <AttendancesList users={users} attendances={customer.attendances} />

                    <div className={Styles.buttonsContainer}>
                        <Button
                            id="go_back"
                            type="button"
                            text="Voltar"
                            tooltip="Clique aqui para voltar a tela principal"
                            onClick={() => router.push('/home')}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return <>Não foi possível carregar as informações desejadas.</>;
    }
};

export default AttendanceHistory;
