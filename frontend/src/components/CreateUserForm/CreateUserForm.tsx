import Button from '@/elements/Button/Buttons';
import Input from '@/elements/Input/input';
import Select from '@/elements/Select/Select';
import { Role } from '@/model/Role';
import { UserService } from '@/services/UserService';
import { useRouter } from 'next/router';
import { FormEvent, JSX, useState } from 'react';
import Swal from 'sweetalert2';
import Styles from './CreateUserForm.module.scss';

const CreateUserForm = (): JSX.Element => {
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>();
    const [role, setRole] = useState<Role>();

    const router = useRouter();

    const createUser = async (e: FormEvent) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            Swal.fire({
                icon: 'warning',
                title: 'As senhas precisam ser iguais!',
                showConfirmButton: false,
                timer: 3000,
            });
        } else {
            if (name && email && password && role) {
                UserService.createUser(name, email, password, role)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'O seu cadastro foi concluído com sucesso!',
                            showConfirmButton: false,
                            timer: 3000,
                        }).then(() => router.push('/home'));
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Não foi possível realizar o cadastro!',
                            showConfirmButton: false,
                            timer: 3000,
                        });
                    });
            }
        }
    };

    return (
        <form id="create_user_form_container" onSubmit={createUser} className={Styles.createUserForm}>
            <Input id="name" type="text" label="Nome" placeholder="Digite o seu nome" onValueChange={(value: string) => setName(value)} />
            <Input id="email" type="email" label="E-mail" placeholder="Digite o seu e-mail" onValueChange={(value: string) => setEmail(value)} />
            <Input id="password" type="password" label="Senha" placeholder="Digite uma senha" onValueChange={(value: string) => setPassword(value)} />
            <Input
                id="confirm_password"
                type="password"
                label="Confirmação de senha"
                placeholder="Confirme sua senha"
                onValueChange={(value: string) => setPasswordConfirmation(value)}
            />

            <Select
                id="role_selector"
                name="Selecione o tipo de acesso"
                onValueChange={(value: string) => setRole(value as Role)}
                options={[
                    {
                        label: 'Administrador',
                        value: Role.ADMINISTRATOR,
                    },
                    {
                        label: 'Vendedor',
                        value: Role.SELLER,
                    },
                    {
                        label: 'Atendente',
                        value: Role.ATTENDANT,
                    },
                ]}
            />

            <div className={Styles.buttonsContainer}>
                <Button id="submit" type="submit" text="Cadastrar" tooltip="Clique aqui para cadastrar" />
                <Button
                    id="go_back"
                    type="button"
                    text="Voltar"
                    tooltip="Clique aqui para voltar a tela inicial"
                    onClick={() => router.push('/login')}
                />
            </div>
        </form>
    );
};

export default CreateUserForm;
