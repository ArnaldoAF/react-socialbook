import React, { ReactHTML, ButtonHTMLAttributes } from 'react';

import './styles.css'; 
import { Link, LinkProps } from 'react-router-dom';


import loadIcon from '../../assets/images/icons/loader.svg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    name?: string;
    to?:string;
    isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
    const {
        to,
        isLoading,
        ...rest} = props;

    return (
        <>
        
            <button className="button" {...rest} disabled={isLoading}>
            {isLoading ? 
                    <img src={loadIcon} alt=""/>
                    : (
                <>
                    {props.children}
                </>
            )}
            </button>
        
        
        </>
    )
}

export default Button;