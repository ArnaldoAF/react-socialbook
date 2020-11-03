import React, {  useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import Loader from '../../components/Loader';
import ProfileBlock from '../../components/ProfileBlock';

import UserInterface from '../../interfaces/UserInterface';

interface ProfileParam {
    id: string; 
}

const Profile: React.FC<RouteComponentProps<ProfileParam>> = (props) => {
    const [user, setUser] =  useState<UserInterface>({
        id: 0,
        name: "",
        created_at: "",
    });
    
    const [isLoading, setIsLoading] = useState(true);
    
    const [errorMessage, setErrorMessage] = useState("");
    const { match } = props;

    useEffect( () => {
        async function loadProfile() {
            setIsLoading(true);
            var id = match.params.id;
            try{
                setErrorMessage("");
                await  api.get("/user/"+id).then((response) => {
                    console.log(response.data);
                    var user = response.data.data;
                    setUser(user);
            })
            } catch(err) {
                console.log("ERRO AO RECUPERAR PROFILE", err);
                setErrorMessage(err?.response?.data?.message);
            }
            setIsLoading(false);
        }
        loadProfile();
    },[match, match.params.id]);

    
    

    return (
        <div className="container" id="profile-page">
            {isLoading ? 
                <Loader /> : (
                    <>
                    <p>{errorMessage}</p>
                    <ProfileBlock user={user}/> 
                    </> )
                 
            }
        </div>
    )
}

export default Profile;