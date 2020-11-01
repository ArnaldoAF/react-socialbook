import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import "./styles.css";

import { logout,getToken } from '../../services/auth';
import { useHistory, Link } from 'react-router-dom';
import { Power } from 'react-feather';

const Header: React.FC = () => {
    const [userInfo, setUserInfo] =  useState({ 
        id: 0,
        name:" ",
        bio:"string,",
        created_at:" string"
    });
    const history = useHistory();

    useEffect(  () => {
        
        try{
             api.get("/user/"+getToken()).then((response) => {
                console.log(response.data);
                var user = response.data.data;
                setUserInfo(user);
            
        }).catch((response) => {
            console.log("catch", response);
            handleLogoff();
        })
        } catch(err) {
            console.log("ERRO AO RECUPERAR / ME", err);
            handleLogoff();
        }
    },[]);

    function handleLogoff() {
        logout(); 
        history.push("/");
    }

    return (
        <header className="user-header">
            <div className="user-header-content">
                <Link to={`/profile/${getToken()}`}  className="name-box">
                    <img src={("http://lorempixel.com/400/200/sports/"+userInfo?.id)} alt=""/>
                    <p>{userInfo?.name}</p>
                </Link>
                <div className="logoff-box" onClick={handleLogoff}>
                    <Power color="black" size={40}/>
                </div>
            </div>
            
        </header>
    )
}

export default Header;