import RoleProtection from '@/components/RoleProtection/RoleProtection';
import Button from '@/elements/Button/Buttons';
import { useRouter } from 'next/router';
import Styles from './index.module.scss';
import { Role } from '@/model/Role';
import { AuthenticationService } from '@/services/AuthenticationService';
import CustomerSearchInput from '@/elements/CustomerSearchInput/CustomerSearchInput';
import { CustomerDTO } from '@/model/dto/CustomerDTO';
import TrackerLogo from '@/elements/TrackerLogo/TrackerLogo';
import Swal from 'sweetalert2';

const Home = () => {
    const router = useRouter();

    return (
        <div className={Styles.homePage}>
            <div className={Styles.homeContainer}>
                <TrackerLogo />

                <h2>Seja bem-vindo(a), o que deseja fazer hoje?</h2>

                <div>
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
                </div>

                <div className={Styles.buttonsContainer}>
                    <Button id={'new_attendance'} type={'button'} text={'Registrar atendimento'} onClick={() => router.push('/attendances/new')} />
                    <RoleProtection allowableRoles={[Role.ADMINISTRATOR, Role.SELLER]}>
                        <Button id={'new_customer'} type={'button'} text={'Cadastrar cliente'} onClick={() => router.push('/customers/new')} />
                    </RoleProtection>
                    <Button
                        id={'logout'}
                        type={'button'}
                        text={'Encerrar sessão'}
                        onClick={() => {
                            Swal.fire({
                                title: 'Tem certeza?',
                                text: 'Você será redirecionado para a tela de login',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Sim, desejo encerrar a sessão',
                                cancelButtonText: 'Cancelar'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    AuthenticationService.performLogout();
                                    router.push('/login');
                                }
                            });
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
