import React, { FormEvent, useState } from 'react';

import './styles.css';
import CommentInterface from '../../interfaces/CommentInterface';
import commentIcons from '../../assets/images/icons/message-square.svg';
import { Link } from 'react-router-dom';

interface PostProps {
    comment:CommentInterface
}   

const CommentBlock:React.FC<PostProps> = (props) => {
    const {
        comment
    } = props;

    const timezone = new Date().getTimezoneOffset()/60;
    const date = new Date(Date.parse(comment.created_at));
    const day = date.getDay()+1;
    const month = date.getMonth()+1;
    const hour = date.getHours() - timezone;
    const minutes = date.getMinutes() - timezone;

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