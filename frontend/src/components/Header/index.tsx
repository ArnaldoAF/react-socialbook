import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import api from '../../services/api';

import "./styles.css";
import powerIcon from '../../assets/images/icons/power.svg';

import { logout,getToken } from '../../services/auth';

import getProfileUrl from '../../helpers/getProfileUrl';

const Header: React.FC = () => {
    const [userInfo, setUserInfo] =  useState({ 
        id: 0,
        name:" ",
        bio:"string,",
        created_at:" string"
    });
    const history = useHistory();

    useEffect(() => {
        try{
             api.get("/user/"+getToken()).then((response) => {
                console.log(response.data);
                var user = response.data.data;
                setUserInfo(user);
            }).catch((response) => {
                console.log("catch", response);
                logout(); 
                history.push("/");
            })
        } catch(err) {
            console.log("ERRO AO RECUPERAR / ME", err);
            logout(); 
            history.push("/");
        }
    },[history]);

    function handleLogoff() {
        logout(); 
        history.push("/");
    }

    return (
        <header className="user-header">
            <div className="user-header-content">
                <Link to={`/profile/${getToken()}`}  className="name-box">
                    <img src={(getProfileUrl(parseInt(getToken()|| "0") || 0))} alt=""/>
                    <p>{userInfo?.name}</p>
                </Link>
                <div className="logoff-box" onClick={handleLogoff}>
                <img src={powerIcon} alt=""/>
                </div>
            </div>
            
        </header>
    )
}

export default Header;