import { CustomerDTO } from '@/model/dto/CustomerDTO';

const CustomerInformation = (props: CustomerInformationProps) => {
    return (
        <div>
            <p>ID: {props.customer.id}</p>
            <p>Nome: {props.customer.name}</p>
            <p>E-mail: {props.customer.email}</p>
            <p>Telefone: {props.customer.phone}</p>
        </div>
    );
};

interface CustomerInformationProps {
    customer: CustomerDTO;
}

export default CustomerInformation;
