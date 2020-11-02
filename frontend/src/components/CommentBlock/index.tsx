import React, { FormEvent, useState } from 'react';

import './styles.css';
import CommentInterface from '../../interfaces/CommentInterface';
import commentIcons from '../../assets/images/icons/message-square.svg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import getDateTime from '../../helpers/getDateTime';
import { getToken } from '../../services/auth';

import trashIcon from '../../assets/images/icons/trash.svg';

import loadIcon from '../../assets/images/icons/loader.svg';


import getProfileUrl from '../../helpers/getProfileUrl';
import api from '../../services/api';

interface PostProps {
    comment:CommentInterface
}   

const CommentBlock:React.FC<PostProps> = (props) => {
    const {
        comment
    } = props;

    const {day,month,hour,minutes} = getDateTime(comment.created_at);

    const location = useLocation();
    const history = useHistory();
    const [isInvisible, setIsInvisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    async function deleteComment() {
        setIsLoading(true);
        try{
            await api.delete("/comments/"+comment?.id).then((response) => {
               console.log(response.data);
               setIsInvisible(true);
               
        })} catch(err) {
            console.log("ERRO AO RECUPERAR COMMENT", err);
            //setErrorMessage(err?.response?.data?.message);
        }
        setIsLoading(false);
    }
    return (
        
            <div className={"comment-area "+(isInvisible && "invisible")}>
                <div className="comment-header">
                    <Link to={`/profile/${comment.user?.id}`}  >
                        <p><img src={(getProfileUrl(comment.user?.id || 0))} alt=""/> {comment.user?.name}</p>
                    </Link>
                    <p>
                        {comment.user?.id?.toString() == getToken() && (<img src={isLoading ? loadIcon :trashIcon } className="trash" onClick={deleteComment} alt=""/>) }
                        {hour}:{minutes} {day}/{month}  
                    </p>

                </div>
                <div className="comment-body">
                    <p>{comment.comment}</p>
                </div>
                
            </div>
    )
}

export default CommentBlock;