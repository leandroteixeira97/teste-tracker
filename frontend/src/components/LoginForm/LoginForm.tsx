import Button from '@/elements/Button/Buttons';
import Input from '@/elements/Input/input';
import { LocalStorageHelper } from '@/helpers/LocalStorageHelper';
import { RequestHelper } from '@/helpers/RequestHelper';
import { AuthReponse } from '@/model/AuthResponse';
import { LoginDTO } from '@/model/dto/LoginDTO';
import { useRouter } from 'next/router';
import { FormEvent, JSX, useState } from 'react';

const LoginForm = (): JSX.Element => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const router = useRouter();

    const performLogin = async (e: FormEvent) => {
        e.preventDefault();

        if (email && password) {
            const loginDTO: LoginDTO = { email: email, passwordHash: password };

            try {
                const response: AuthReponse = await RequestHelper.post('/auth/login', loginDTO) as unknown as AuthReponse;
                LocalStorageHelper.setItem('access_token', response.access_token);
                router.push('/home');
            } catch {
                window.alert('As credenciais de acesso estão incorretas!');
                LocalStorageHelper.removeItem('access_token');
            }
        }
    };

    return (
        <form id="login_form_container" onSubmit={performLogin}>
            <Input id="email" type="email" label="E-mail" placeholder="Digite aqui seu e-mail" onValueChange={(value: string) => setEmail(value)} />
            <Input
                id="password"
                type="password"
                label="Senha"
                placeholder="Digite aqui sua senha"
                onValueChange={(value: string) => setPassword(value)}
            />
            <Button id="submit" type="submit" text="Login" tooltip="Clique aqui para fazer o login" />
        </form>
    );
};

export default LoginForm;
