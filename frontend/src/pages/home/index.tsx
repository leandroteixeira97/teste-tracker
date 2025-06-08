import RoleProtection from '@/components/RoleProtection/RoleProtection';
import Button from '@/elements/Button/Buttons';
import { useRouter } from 'next/router';
import Styles from './index.module.scss';
import { Role } from '@/model/Role';
import { AuthenticationService } from '@/services/AuthenticationService';
import CustomerSearchInput from '@/elements/CustomerSearchInput/CustomerSearchInput';
import { CustomerDTO } from '@/model/dto/CustomerDTO';

const Home = () => {
    const router = useRouter();

    return (
        <div className={Styles.homeContainer}>
            <h1>Seja bem-vind(a) ao CRM Tracker!</h1>
            <h2>O que deseja fazer hoje?</h2>

            <CustomerSearchInput
                id="customer_search_input"
                label="Pesquisar atendimentos por clientes"
                onSelectedValueChange={(customer?: CustomerDTO) => {
                    if (customer) {
                        router.push('/attendances/history?id=' + customer.id);
                    }
                }}
                placeholder="Digite o nome ou e-mail do cliente"
            />
            <Button id={'new_attendance'} type={'button'} text={'Registrar atendimento'} onClick={() => router.push('/attendances/new')} />
            <RoleProtection allowableRoles={[Role.ADMINISTRATOR, Role.SELLER]}>
                <Button id={'new_customer'} type={'button'} text={'Cadastrar cliente'} onClick={() => router.push('/customers/new')} />
            </RoleProtection>
            <Button
                id={'logout'}
                type={'button'}
                text={'Encerrar sessão'}
                onClick={() => {
                    AuthenticationService.performLogout();
                    router.push('/login');
                }}
            />
        </div>
    );
};

export default Home;
