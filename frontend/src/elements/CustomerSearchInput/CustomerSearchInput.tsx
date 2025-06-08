import { JSX, useEffect, useRef, useState } from 'react';
import Input from '../Input/input';
import Styles from './CustomerSearchInput.module.scss';
import { CustomerDTO } from '@/model/dto/CustomerDTO';
import { CustomerService } from '@/services/CustomerService';

const CustomerSearchInput = (props: CustomerSearchInputProps) => {
    const [customers, setCustomers] = useState<CustomerDTO[]>();
    const [options, setOptions] = useState<JSX.Element[]>();
    const [isOptionsListOpen, setIsOptionsListOpen] = useState<boolean>();
    const optionsListRef = useRef<HTMLOListElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (!optionsListRef.current?.contains(e.target as Node)) {
                setIsOptionsListOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const createOption = (customer?: CustomerDTO) => {
        let id: string = 'no_match';
        let name: string = 'Não há correspondências';

        if (customer) {
            id = customer.id;
            name = customer.name;
        }

        return (
            <li
                id={`${id}_option`}
                key={`${id}_key`}
                onClick={() => {
                    props.onSelectedValueChange(customer);
                    setIsOptionsListOpen(false);
                }}
            >
                {name}
            </li>
        );
    };

    const noMatchOption: JSX.Element = createOption();

    useEffect(() => {
        const getCustomers = async () => {
            const customers: CustomerDTO[] = await CustomerService.getAllCustomers();

            setCustomers(customers);
        };

        getCustomers();
    }, []);

    const handleOptionsContainer = (typedValue: string) => {
        let filteredCustomers: CustomerDTO[] = [];

        if (typedValue && customers?.length) {
            filteredCustomers = customers?.filter(
                (customer: CustomerDTO) => customer.email?.includes(typedValue) || customer.name.includes(typedValue),
            );

            if (filteredCustomers.length) {
                const options: JSX.Element[] = filteredCustomers.map((customer: CustomerDTO) => createOption(customer));

                setOptions(options);
            } else {
                setOptions([noMatchOption]);
            }

            setIsOptionsListOpen(true);
        }

        if (!typedValue) {
            setOptions([noMatchOption]);
            setIsOptionsListOpen(false);
        }
    };

    return (
        <div className={Styles.customerSearchInputContainer}>
            <Input id={props.id} type="search" label={props.label} placeholder={props.placeholder} onValueChange={handleOptionsContainer} />
            {isOptionsListOpen && (
                <ol id={'customer_list'} className={Styles.customerList} ref={optionsListRef}>
                    {options}
                </ol>
            )}
        </div>
    );
};

interface CustomerSearchInputProps {
    id: string;
    label: string;
    placeholder: string;
    onSelectedValueChange: (customer?: CustomerDTO) => void;
}

export default CustomerSearchInput;
