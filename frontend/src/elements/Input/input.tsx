import { ChangeEvent, HTMLInputTypeAttribute, JSX } from 'react';
import Styles from './input.module.scss';

const Input = (props: InputProps): JSX.Element => {
    const labelElement = buildLabelElement(props);
    const inputElement = buildInputElement(props);

    return (
        <div id={`${props.id}_input_container`} className={Styles.inputContainer}>
            {labelElement}
            {inputElement}
        </div>
    );
};

const buildInputElement = (props: InputProps): JSX.Element => {
    if (props.type === 'textarea') {
        return (
            <textarea
                id={props.id}
                placeholder={props.placeholder}
                onChange={(e: ChangeEvent) => props.onValueChange((e.target as HTMLInputElement).value)}
                disabled={props.disabled}
                value={props.value}
            />
        );
    }

    return (
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={(e: ChangeEvent) => props.onValueChange((e.target as HTMLInputElement).value)}
            disabled={props.disabled}
            value={props.value}
        />
    );
};

const buildLabelElement = (props: InputProps): JSX.Element => {
    return (
        <label htmlFor={props.id} id={`${props.id}_input_label`} className={Styles.labelInput}>
            {props.label}
        </label>
    );
};

interface InputProps {
    id: string;
    type: HTMLInputTypeAttribute | 'textarea';
    placeholder: string;
    label: string;
    onValueChange: (value: string) => void;
    disabled?: boolean;
    value?: string;
}

export default Input;
