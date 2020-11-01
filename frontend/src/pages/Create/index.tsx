import React, { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import Input from '../../components/Input';
import Post from '../../components/Post';
import PostInterface from '../../interfaces/PostInterface';
import UserInterface from '../../interfaces/UserInterface';
import api from '../../services/api';



import './styles.css';



const Create:React.FC = () => {
    
    const [postText, setPostText] = useState("");

    return (
        <div className="container">
            <p>Criar Post</p> 
            <Input
                name="post"
                label="post"
                value={postText}
                type="textarea"
                onChange={(e) => setPostText(e.target.value)}
            />
        </div>
    );
}

export default Create;