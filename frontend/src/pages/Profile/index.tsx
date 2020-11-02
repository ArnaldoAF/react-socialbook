import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ProfileBlock from '../../components/ProfileBlock';
import UserInterface from '../../interfaces/UserInterface';
import api from '../../services/api';
import './styles.css';

interface ProfileParam {
    id: string; 
}

const Profile: React.FC<RouteComponentProps<ProfileParam>> = (props) => {
    const [user, setUser] =  useState<UserInterface>({
        id: 0,
        name: "",
        created_at: "",
    });
    const { match } = props;
    
    

    useEffect(  () => {
        var id = match.params.id;
        try{
             api.get("/user/"+id).then((response) => {
                console.log(response.data);
                var user = response.data.data;
                setUser(user);
        })
        } catch(err) {
            console.log("ERRO AO RECUPERAR / ME", err);
        }
    },[match]);
    

    return (
        <div className="container" id="profile-page">
            <ProfileBlock user={user} />
        </div>
    )
}

export default Profile;