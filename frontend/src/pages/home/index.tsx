import RoleProtection from '@/components/RoleProtection/RoleProtection';
import Button from '@/elements/Button/Buttons';
import { useRouter } from 'next/router';
import Styles from './index.module.scss';
import { Role } from '@/model/Role';
import { AuthenticationService } from '@/services/AuthenticationService';

const Home = () => {
    const router = useRouter();

    return (
        <div className={Styles.homeContainer}>
            <h1>Seja bem-vind(a) ao CRM Tracker!</h1>
            <h2>O que deseja fazer hoje?</h2>

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
