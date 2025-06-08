import Button from '@/elements/Button/Buttons';
import Input from '@/elements/Input/input';
import { AttendanceService } from '@/services/AttendanceService';
import { useRouter } from 'next/router';
import { FormEvent, JSX, useState } from 'react';

const CreateAttendanceForm = (): JSX.Element => {
    const [description, setDescription] = useState<string>();
    const [customerId, setCustomerId] = useState<string>();

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

    return (
        <form id="create_customer_form_container" onSubmit={createAttendance}>
            <Input
                id="customer_id"
                type="text"
                label="ID do Cliente"
                placeholder="Digite aqui o ID do Cliente"
                onValueChange={(value: string) => setCustomerId(value)}
            />
            <Input
                id="description"
                type="textarea"
                label="Descrição do atendimento"
                placeholder="Descreva aqui o atendimento"
                onValueChange={(value: string) => setDescription(value)}
            />
            <Button
                id="submit"
                type="submit"
                text="Registrar"
                tooltip="Clique aqui para registrar o atendimento" />
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
