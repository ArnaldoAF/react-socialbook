import React, { FormEvent, useState } from 'react';

import './styles.css';
import PostInterface from '../../interfaces/PostInterface';
import commentIcons from '../../assets/images/icons/message-square.svg';
import { Link } from 'react-router-dom';
import getDateTime from '../../helpers/getDateTime';

interface PostProps {
    post:PostInterface
}   

const PostBlock:React.FC<PostProps> = (props) => {
    const {
        post
    } = props;

    const {day,month,hour,minutes} = getDateTime(post.created_at);

    return (
        
            <div className="post-area">
                <div className="post-header">
                    <Link to={`/profile/${post.user?.id}`}  >
                        <p><img src={("http://lorempixel.com/400/200/sports/"+post.user?.id)} alt=""/> {post.user?.name}</p>
                    </Link>
                    <p>{hour}:{minutes} {day}/{month}  </p>

                </div>
                <Link to={`/post/${post.id}`} className="post-body">
                    
                    <p>{post.message}</p>
                </Link>
                <div className="post-footer">
                    
                    <img src={commentIcons} alt=""/> {post.comments}
                </div>
            </div>
    )
}

export default PostBlock;