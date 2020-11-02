import React, { FormEvent, useState } from 'react';

import './styles.css';
import CommentInterface from '../../interfaces/CommentInterface';
import commentIcons from '../../assets/images/icons/message-square.svg';
import { Link } from 'react-router-dom';
import getDateTime from '../../helpers/getDateTime';

interface PostProps {
    comment:CommentInterface
}   

const CommentBlock:React.FC<PostProps> = (props) => {
    const {
        comment
    } = props;

    const {day,month,hour,minutes} = getDateTime(comment.created_at);
    

    return (
        
            <div className="comment-area">
                <div className="comment-header">
                    <Link to={`/profile/${comment.user?.id}`}  >
                        <p><img src={("http://lorempixel.com/400/200/sports/"+comment.user?.id)} alt=""/> {comment.user?.name}</p>
                    </Link>
                    <p>{hour}:{minutes} {day}/{month}  </p>

                </div>
                <div className="comment-body">
                    <p>{comment.comment}</p>
                </div>
                
            </div>
    )
}

export default CommentBlock;