import React from 'react';

import "./styles.css";

import loadIcon from '../../assets/images/icons/loader.svg';

const Loader: React.FC = () => {

    return (
        <div className=" loader">
            <img src={loadIcon} alt=""/>
        </div>
    )
}

export default Loader;