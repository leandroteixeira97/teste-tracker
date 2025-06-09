import { ChangeEvent, JSX } from 'react';
import Styles from './Select.module.scss';

const Select = (props: SelectProps) => {
    let options: JSX.Element[] = [];

    if (props.options.length) {
        options = props.options.map((option: SelectOption) => (
            <option id={`option_${option.value}`} key={`option_${option.value}_key`} value={option.value}>
                {option.label}
            </option>
        ));
    }

    return (
        <div className={Styles.selectContainer}>
            <label htmlFor={props.id}>{props.name}</label>
            <select id={props.id} name={props.name} onChange={(e: ChangeEvent) => props.onValueChange((e.target as HTMLInputElement).value)}>
                {options}
            </select>
        </div>
    );
};

interface SelectProps {
    id: string;
    name: string;
    onValueChange: (value: string) => void;
    options: SelectOption[];
}

export interface SelectOption {
    value: string;
    label: string;
}

export default Select;
