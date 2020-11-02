import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import PostBlock from '../../components/PostBlock';
import PostInterface from '../../interfaces/PostInterface';
import UserInterface from '../../interfaces/UserInterface';
import api from '../../services/api';



import './styles.css';



const Login:React.FC = () => {
    const [postList, SetPostList] = useState<PostInterface[]>();
    useEffect(  () => {
        
        try{
            api.get("/post").then((response) => {
                console.log(response.data);
                var postList = response.data.data;
                console.log(postList);
                SetPostList(postList);
                
            })
        } catch(err) {
            console.log("ERRO AO RECUPERAR / ME", err);
        }
    },[]);

    return (
        <div className="container">
            
            {postList?.map((post:PostInterface) => {
                return <PostBlock post={post}/>
                
            })}
        </div>

    );
}

export default Login;