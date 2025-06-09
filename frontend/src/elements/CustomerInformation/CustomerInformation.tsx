import { CustomerDTO } from '@/model/dto/CustomerDTO';
import Styles from './CustomerInformation.module.scss';

const CustomerInformation = (props: CustomerInformationProps) => {
    return (
        <div className={Styles.customerInformationContainer}>
            <h3>Dados do cliente</h3>
            <p>
                <b>ID: </b>
                {props.customer.id}
            </p>
            <p>
                <b>Nome: </b>
                {props.customer.name}
            </p>
            <p>
                <b>E-mail: </b>
                {props.customer.email}
            </p>
            <p>
                <b>Telefone: </b>
                {props.customer.phone}
            </p>
        </div>
    );
};

interface CustomerInformationProps {
    customer: CustomerDTO;
}

export default CustomerInformation;
