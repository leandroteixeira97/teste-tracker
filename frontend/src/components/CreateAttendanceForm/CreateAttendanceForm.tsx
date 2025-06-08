import Button from '@/elements/Button/Buttons';
import CustomerSearchInput from '@/elements/CustomerSearchInput/CustomerSearchInput';
import Input from '@/elements/Input/input';
import { CustomerDTO } from '@/model/dto/CustomerDTO';
import { AttendanceService } from '@/services/AttendanceService';
import { useRouter } from 'next/router';
import { FormEvent, JSX, useState } from 'react';

const CreateAttendanceForm = (): JSX.Element => {
    const [description, setDescription] = useState<string>();
    const [customerId, setCustomerId] = useState<string>();
    const [customerName, setCustomerName] = useState<string>();

    const router = useRouter();

    const createAttendance = async (e: FormEvent) => {
        e.preventDefault();

        if (description && customerId) {
            try {
                await AttendanceService.createAttendance(customerId, description);
                router.push('/home');
            } catch {
                window.alert('Não foi possível cadastrar o atendimento!');
            }
        }
    };

    const handleCustomerSelection = (customer?: CustomerDTO) => {
        if (customer) {
            setCustomerId(customer.id);
            setCustomerName(customer.name);
        } else {
            setCustomerId('');
            setCustomerName('');
        }
    };

    return (
        <form id="create_customer_form_container" onSubmit={createAttendance}>
            <CustomerSearchInput
                id="customer_search_input"
                label="Pesquisar cliente"
                placeholder="Digite o nome ou e-mail do cliente"
                onSelectedValueChange={(customer?: CustomerDTO) => handleCustomerSelection(customer)}
            />
            <Input
                id="customer_name"
                type="text"
                label="Nome do Cliente"
                placeholder="Nome do Cliente"
                disabled
                value={customerName}
                onValueChange={(value: string) => setCustomerName(value)}
            />
            <Input
                id="customer_id"
                type="text"
                label="ID do Cliente"
                placeholder="ID do Cliente"
                disabled
                value={customerId}
                onValueChange={(value: string) => setCustomerId(value)}
            />
            <Input
                id="description"
                type="textarea"
                label="Descrição do atendimento"
                placeholder="Descreva aqui o atendimento"
                onValueChange={(value: string) => setDescription(value)}
            />
            <Button id="submit" type="submit" text="Registrar" tooltip="Clique aqui para registrar o atendimento" />
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

export default CreateAttendanceForm;
