import React, {TextareaHTMLAttributes} from 'react';
import './styles.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
}

const TextArea: React.FC<TextAreaProps> = (props, children) => {
    const {
        label,
        name,
        ...rest
    } = props;

    return (
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <textarea  id={name} {...rest}></textarea>
        </div>
    )
}

export default TextArea;