import React, { FormEvent, useState } from 'react';
import {useHistory} from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';
import { login } from '../../services/auth';

import './styles.css';

const Login:React.FC = () => {
    const [loginUser, setLoginUser] = useState("");
    const [singUpUser, setSingUpUser] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessageLogin, setErrorMessageLogin] = useState("");
    
    const [errorMessageSingUp, setErrorMessageSingUp] = useState("");

    const history = useHistory();

    async function handleLogin(e:FormEvent) {
        e.preventDefault();
        
        setIsLoading(true);
       
        await api.get("/login", {
            params: {
                username:loginUser
            }}).then(response => {
                console.log(response.data);
                login(response.data.data);
                history.push("/home");
        }).catch(err => {
            console.log("erro login",{err});
            console.log("erro login", err.data);
            console.log("erro login", err?.response?.data?.message);
            setErrorMessageLogin(err?.response?.data?.message);

        });

        setIsLoading(false);
    }

    async function handleSingUp(e:FormEvent) {
        e.preventDefault();
        
        setIsLoading(true);
       
        await api.post("/user", {
                name: singUpUser
            }).then(response => {
                console.log(response.data);
                login(response.data.id);
                history.push("/home");
        }).catch(err => {
            console.log("erro login",{err});
            console.log("erro login", err.data);
            console.log("erro login", err?.response?.data?.message);
            setErrorMessageSingUp(err?.response?.data?.message);

        });

        setIsLoading(false);
    }

    
    return (
        <div id="login-container">
            <div id="logo-header">
                <p>@tech_desafio</p>
            </div>
            <div id="login-singup-area">
                <div id="login-area">
                    <form action="" id="login-form" onSubmit={handleLogin}>
                        <Input
                                    name="login"
                                    label="Login"
                                    value={loginUser}
                                    onChange={(e) => setLoginUser(e.target.value)}
                                />
                                <p>{errorMessageLogin}</p>
                        <Button type="submit" isLoading={isLoading}>
                                <p> "LOGIN"</p>
                        </Button>
                    </form>
                </div>
                <div id="singup-area">
                    <form action="" id="login-form" onSubmit={handleSingUp}>
                        <Input
                                    name="sing-up"
                                    label="Cadastre-se"
                                    value={singUpUser}
                                    onChange={(e) => setSingUpUser(e.target.value)}
                                />
                                <p>{errorMessageSingUp}</p>
                        <Button type="submit" isLoading={isLoading}>
                            <p>"CADASTRE-SE"</p>
                        </Button>
                    </form>
                </div>
            </div>
            
        </div>

    );
}

export default Login;