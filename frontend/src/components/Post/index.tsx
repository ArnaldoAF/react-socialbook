import React, { FormEvent, useState } from 'react';

import './styles.css';
import PostInterface from '../../interfaces/PostInterface';
import commentIcons from '../../assets/images/icons/message-square.svg';

interface PostProps {
    post:PostInterface
}   

const Post:React.FC<PostProps> = (props) => {
    const {
        post
    } = props;

    const timezone = new Date().getTimezoneOffset()/60;
    const date = new Date(Date.parse(post.created_at));
    const day = date.getDay()+1;
    const month = date.getMonth()+1;
    const hour = date.getHours() - timezone;
    const minutes = date.getMinutes() - timezone;

    return (
        
            <div className="post-area">
                <div className="post-header">
                    <p><img src={("http://lorempixel.com/400/200/sports/"+post.user?.id)} alt=""/> {post.user?.name}</p>
                    <p>{hour}:{minutes} {day}/{month}  </p>

                </div>
                <div className="post-body">
                    <p>{post.message}</p>
                </div>
                <div className="post-footer">
                    
                    <img src={commentIcons} alt=""/> {post.comments}
                </div>
            </div>
    )
}

export default Post;