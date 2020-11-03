import React from 'react';

import './styles.css';
import commentIcons from '../../assets/images/icons/message-square.svg';
import postIcon from '../../assets/images/icons/trello.svg';

import UserInterface from '../../interfaces/UserInterface';

import getProfileUrl from '../../helpers/getProfileUrl';
import getDateTime from '../../helpers/getDateTime';

interface ProfileBlockProps {
    user:UserInterface
}   

const ProfileBlock:React.FC<ProfileBlockProps> = (props) => {
    const { user } = props;
    const {day,month, year} = getDateTime(user.created_at);

    return (
        
            <div className="profile-container">
                <img src={(getProfileUrl(user.id))} alt=""/>
                <p className="profile-username"> {user.name}</p>
                <p className="profile-bio" > <i>Criado em: {day}/{month}/{year}</i></p>

                <div className="profile-footer">
                    <div><img src={postIcon} alt=""/> {user.posts}</div>
                    <div><img src={commentIcons} alt=""/> {user.comments}</div>
                </div>
            </div> 
    )
}

export default ProfileBlock;