import React, { FormEvent, useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Post from '../../components/Post';
import TextArea from '../../components/TextArea';
import PostInterface from '../../interfaces/PostInterface';
import UserInterface from '../../interfaces/UserInterface';
import api from '../../services/api';
import sendIcon from '../../assets/images/icons/send.svg';
import loadIcon from '../../assets/images/icons/loader.svg';


import './styles.css';
import { getToken } from '../../services/auth';



const Create:React.FC = () => {
    
    const [postText, setPostText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessagePost, setErrorMessagePost] = useState("");
    const history = useHistory();

    async function handlePost(e:FormEvent) {
        e.preventDefault();

        setIsLoading(true);

       
        await api.post("/post", {
                user_id: getToken(),
                message: postText
            }).then(response => {
                console.log(response.data);
                history.push("/home");
        }).catch(err => {
            console.log("erro Post",{err});
            console.log("erro Post", err.data);
            console.log("erro Post", err?.response?.data?.message);
            setErrorMessagePost(err?.response?.data?.message);

        });

        setIsLoading(false);
        
    }

    return (
        <div className="container">
            <p>Criar Post</p> 
            <form action="" id="post-form" onSubmit={handlePost}>
                <TextArea
                    name="post"
                    label=""
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                />
                <p>{errorMessagePost}</p>
                <Button type="submit" disabled={isLoading}>
                                {isLoading ? 
                                        <img src={loadIcon} alt=""/>
                                        : (
                                        <>
                                             Postar <img src={sendIcon} alt=""/>
                                        </>
                                        )}
                </Button>
            </form>
        </div>
    );
}

export default Create;