import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import "./styles.css";

import { logout,getToken } from '../../services/auth';


import loadIcon from '../../assets/images/icons/loader.svg';

const Loader: React.FC = () => {

    return (
        <div className=" loader">
            <img src={loadIcon} alt=""/>
        </div>
    )
}

export default Loader;