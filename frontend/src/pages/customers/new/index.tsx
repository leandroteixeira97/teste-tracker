import CreateCustomerForm from '@/components/CreateCustomerForm/CreateCustomerForm';
import Styles from './index.module.scss';
import TrackerLogo from '@/elements/TrackerLogo/TrackerLogo';

const CreateCustomer = () => {
    return (
        <div className={Styles.createCustomerPage}>
            <div className={Styles.createCustomerContainer}>
                <TrackerLogo />
                <h2>Cadastrar cliente</h2>
                <CreateCustomerForm />
            </div>
        </div>
    );
};

export default CreateCustomer;
