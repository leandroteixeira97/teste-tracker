import Button from '@/elements/Button/Buttons';
import Input from '@/elements/Input/input';
import { CustomerService } from '@/services/CustomerService';
import { useRouter } from 'next/router';
import { FormEvent, JSX, useState } from 'react';
import Styles from './CreateCustomerForm.module.scss';
import RoleProtection from '../RoleProtection/RoleProtection';
import { Role } from '@/model/Role';
import Swal from 'sweetalert2';

const CreateCustomerForm = (): JSX.Element => {
    const allowableRoles: Role[] = [Role.ADMINISTRATOR, Role.SELLER];

    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();

    const router = useRouter();

    const createCustomer = async (e: FormEvent) => {
        e.preventDefault();

        if (name && email && phone) {
            CustomerService.createCustomer(name, email, phone)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'O cliente foi cadastrado com sucesso!',
                        showConfirmButton: false,
                        timer: 3000,
                    }).then(() => router.push('/home'));
                })
                .catch(() => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Não foi possível cadastrar o cliente!',
                        showConfirmButton: false,
                        timer: 3000,
                    });
                });
        }
    };

    return (
        <form id="create_customer_form_container" onSubmit={createCustomer} className={Styles.createCustomerForm}>
            <RoleProtection allowableRoles={allowableRoles} customMessage="Você não possui permissão para cadastrar clientes">
                <Input
                    id="name"
                    type="text"
                    label="Nome"
                    placeholder="Digite aqui o nome do cliente"
                    onValueChange={(value: string) => setName(value)}
                />
                <Input
                    id="email"
                    type="email"
                    label="E-mail"
                    placeholder="Digite o e-mail do cliente"
                    onValueChange={(value: string) => setEmail(value)}
                />
                <Input
                    id="phone"
                    type="phone"
                    label="Telefone"
                    placeholder="Digite o telefone do cliente"
                    onValueChange={(value: string) => setPhone(value)}
                />
            </RoleProtection>

            <div className={Styles.buttonsContainer}>
                <RoleProtection allowableRoles={allowableRoles}>
                    <Button id="submit" type="submit" text="Cadastrar" tooltip="Clique aqui para cadastrar" />
                </RoleProtection>
                <Button
                    id="go_back"
                    type="button"
                    text="Voltar"
                    tooltip="Clique aqui para voltar a tela principal"
                    onClick={() => router.push('/home')}
                />
            </div>
        </form>
    );
};

export default CreateCustomerForm;
