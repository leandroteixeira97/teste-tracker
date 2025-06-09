import CreateUserForm from '@/components/CreateUserForm/CreateUserForm';
import Styles from './index.module.scss';
import TrackerLogo from '@/elements/TrackerLogo/TrackerLogo';

const CreateUser = () => {
    return (
        <div className={Styles.createUserPage}>
            <div className={Styles.createUserContainer}>
                <TrackerLogo />
                <h2>Realize seu cadastro em nossa plataforma</h2>
                <CreateUserForm />
            </div>
        </div>
    );
};

export default CreateUser;
