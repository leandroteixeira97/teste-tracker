import Button from '@/elements/Button/Buttons';
import Input from '@/elements/Input/input';
import { CustomerService } from '@/services/CustomerService';
import { useRouter } from 'next/router';
import { FormEvent, JSX, useState } from 'react';

const CreateCustomerForm = (): JSX.Element => {
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();

    const router = useRouter();

    const createCustomer = async (e: FormEvent) => {
        e.preventDefault();

        if (name && email && phone) {
            try {
                await CustomerService.createCustomer(name, email, phone);
                router.push('/home');
            } catch {
                window.alert('Não foi possível cadastrar o cliente!');
            }
        }
    };

    return (
        <form id="create_customer_form_container" onSubmit={createCustomer}>
            <Input id="name" type="text" label="Nome" placeholder="Digite aqui o nome do cliente" onValueChange={(value: string) => setName(value)} />
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
            <Button id="submit" type="submit" text="Cadastrar" tooltip="Clique aqui para cadastrar" />
            <Button
                id="go_back"
                type="button"
                text="voltar"
                tooltip="Clique aqui para voltar a tela principal"
                onClick={() => router.push('/home')}
            />
        </form>
    );
};

export default CreateCustomerForm;
