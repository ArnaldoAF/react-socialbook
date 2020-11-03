import React, { FormEvent, useState } from 'react';
import {useHistory} from 'react-router-dom';

import { getToken } from '../../services/auth';
import api from '../../services/api';

import './styles.css';
import sendIcon from '../../assets/images/icons/send.svg';

import Button from '../../components/Button';
import TextArea from '../../components/TextArea';

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
            <form action="" id="post-form" onSubmit={handlePost}>
                <TextArea
                    name="post"
                    label=""
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                />
                <p>{errorMessagePost}</p>
                <Button type="submit"  isLoading={isLoading}>
                    Postar <img src={sendIcon} alt=""/>
                </Button>
            </form>
        </div>
    );
}

export default Create;