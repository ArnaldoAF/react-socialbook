import React, { FormEvent, useState } from 'react';

import './styles.css';
import PostInterface from '../../interfaces/PostInterface';
import commentIcons from '../../assets/images/icons/message-square.svg';
import postIcon from '../../assets/images/icons/trello.svg';
import UserInterface from '../../interfaces/UserInterface';

import getProfileUrl from '../../helpers/getProfileUrl';

interface ProfileBlockProps {
    user:UserInterface
}   

const ProfileBlock:React.FC<ProfileBlockProps> = (props) => {
    const {
        user
    } = props;

    
    return (
        
            <div className="profile-container">
                <img src={(getProfileUrl(user.id))} alt=""/>
                <p className="profile-username"> {user.name}</p>
                <p className="profile-bio" > {user.bio || (<i>Sem bio</i>)}</p>

                <div className="profile-footer">
                    <div><img src={postIcon} alt=""/> {user.posts}</div>
                    <div><img src={commentIcons} alt=""/> {user.comments}</div>
                </div>
            </div> 
    )
}

export default ProfileBlock;