import React, { useState } from 'react';
import {useHistory} from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';

import './styles.css';

const Login:React.FC = () => {
    const [loginUser, setLoginUser] = useState("");
    const [singUpUser, setSingUpUser] = useState("");

    return (
        <div id="login-container">
            <div id="logo-header">
                <p>@tech_desafio</p>
            </div>
            <div id="login-singup-area">
                <div id="login-area">
                    <Input
                                name="login"
                                label="Login"
                                value={loginUser}
                                onChange={(e) => setLoginUser(e.target.value)}
                            />
                    <Button>
                            <p>LOGIN</p>
                    </Button>
                </div>
                <div id="singup-area">
                    <Input
                                name="sing-up"
                                label="Cadastre-se"
                                value={singUpUser}
                                onChange={(e) => setSingUpUser(e.target.value)}
                            />
                    <Button>
                        <p>CADASTRAR</p>
                    </Button>
                </div>
            </div>
            
        </div>

    );
}

export default Login;