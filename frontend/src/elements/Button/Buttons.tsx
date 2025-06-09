import Styles from './Buttons.module.scss';

const Button = (props: ButtonProps) => {
    return (
        <button id={props.id} onClick={props.onClick} type={props.type} title={props.tooltip} className={Styles.button}>
            {props.text}
        </button>
    );
};

interface ButtonProps {
    id: string;
    onClick?: () => void;
    type: 'submit' | 'reset' | 'button';
    text: string;
    tooltip?: string;
}

export default Button;
