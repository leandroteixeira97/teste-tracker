import LoginForm from '../../components/LoginForm/LoginForm';
import Styles from './index.module.scss';

const Login = () => {
    return (
        <div className={Styles.login}>
            <h2>Bem vindo!</h2>
            <LoginForm />
        </div>
    );
};

export default Login;
