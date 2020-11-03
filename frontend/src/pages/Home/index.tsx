import React, { useEffect, useState } from 'react';

import api from '../../services/api';

import './styles.css';

import PostInterface from '../../interfaces/PostInterface';

import Loader from '../../components/Loader';
import PostList from '../../components/PostList';

const Login:React.FC = () => {
    const [postList, SetPostList] = useState<PostInterface[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    
    async function LoadData()
    {   
        setIsLoading(true);
        try{
            setErrorMessage("");
            await api.get("/post").then((response) => {
                console.log(response.data);
                var postList = response.data.data;
                console.log(postList);
                SetPostList(postList);
                
            })
        } catch(err) {
            console.log("ERRO AO RECUPERAR POSTS", err);
            
            setErrorMessage(err?.response?.data?.message);
        }
        
        setIsLoading(false);}

    useEffect(() => {
        LoadData();
    },[]);



    return (
        <div className="container">
            {isLoading ? 
            <Loader /> : (
                <>
                    <p>{errorMessage}</p>
                    <PostList postList={postList || []} />
                </>
            )}
        </div>

    );
}

export default Login;