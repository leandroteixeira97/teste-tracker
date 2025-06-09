import Button from '@/elements/Button/Buttons';
import Input from '@/elements/Input/input';
import { AuthenticationService } from '@/services/AuthenticationService';
import { useRouter } from 'next/router';
import { FormEvent, JSX, useState } from 'react';
import Styles from './LoginForm.module.scss';
import TrackerLogo from '@/elements/TrackerLogo/TrackerLogo';

const LoginForm = (): JSX.Element => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const router = useRouter();

    const performLogin = async (e: FormEvent) => {
        e.preventDefault();

        if (email && password) {
            try {
                await AuthenticationService.performLogin(email, password);
                router.push('/home');
            } catch {
                window.alert('As credenciais de acesso estão incorretas!');
            }
        }
    };

    return (
        <form id="login_form_container" onSubmit={performLogin} className={Styles.loginFormContainer}>
            <TrackerLogo />
            <h2>Realize seu login:</h2>
            <div className={Styles.inputsContainer}>
                <Input
                    id="email"
                    type="email"
                    label="E-mail"
                    placeholder="Digite aqui seu e-mail"
                    onValueChange={(value: string) => setEmail(value)}
                />
                <Input
                    id="password"
                    type="password"
                    label="Senha"
                    placeholder="Digite aqui sua senha"
                    onValueChange={(value: string) => setPassword(value)}
                />
            </div>
            <div className={Styles.buttonsContainer}>
                <Button id="submit" type="submit" text="Login" tooltip="Clique aqui para fazer o login" />
                <Button
                    id="submit"
                    type="button"
                    text="Cadastrar"
                    tooltip="Clique aqui para se cadastrar no sistema"
                    onClick={() => router.push('/users/new')}
                />
            </div>
        </form>
    );
};

export default LoginForm;
