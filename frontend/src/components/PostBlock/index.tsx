import React, { FormEvent, useState } from 'react';

import './styles.css';
import PostInterface from '../../interfaces/PostInterface';
import commentIcons from '../../assets/images/icons/message-square.svg';
import { Link, useHistory, useLocation } from 'react-router-dom';
import getDateTime from '../../helpers/getDateTime';
import { getToken } from '../../services/auth';

import trashIcon from '../../assets/images/icons/trash.svg';
import loadIcon from '../../assets/images/icons/loader.svg';


import getProfileUrl from '../../helpers/getProfileUrl';
import api from '../../services/api';

interface PostProps {
    post:PostInterface
}   

const PostBlock:React.FC<PostProps> = (props) => {
    const {
        post
    } = props;

    const {day,month,hour,minutes} = getDateTime(post.created_at);
    const location = useLocation();
    const history = useHistory();
    const [isInvisible, setIsInvisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    console.log(location.pathname);

    async function deletePost() {
        setIsLoading(true);
        try{
            await api.delete("/post/"+post?.id).then((response) => {
               console.log(response.data);
               setIsInvisible(true);
               if(location.pathname != "/home" && location.pathname != "/search") {
                    history.push("/home");
               }
        })} catch(err) {
            console.log("ERRO AO RECUPERAR POST", err);
            //setErrorMessage(err?.response?.data?.message);
        }
        setIsLoading(false);
    }

    return (
        
            <div className={"post-area "+(isInvisible && "invisible")}>
                <div className="post-header">
                    <Link to={`/profile/${post.user?.id}`}  >
                        <p><img src={(getProfileUrl(post.user?.id || 0))} alt=""/> {post.user?.name}</p>
                    </Link>
                    <p> 
                         {post.user?.id == getToken()?.toString() && (<img src={isLoading ? loadIcon :trashIcon } className="trash" onClick={deletePost} alt=""/>) }
                        {hour}:{minutes} {day}/{month}  
                    </p>

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