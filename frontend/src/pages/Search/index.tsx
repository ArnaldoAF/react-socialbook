import React, { FormEvent, useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PostBlock from '../../components/PostBlock';
import TextArea from '../../components/TextArea';
import PostInterface from '../../interfaces/PostInterface';
import UserInterface from '../../interfaces/UserInterface';
import api from '../../services/api';
import sendIcon from '../../assets/images/icons/send.svg';
import loadIcon from '../../assets/images/icons/loader.svg';

import searchIcon from '../../assets/images/icons/search.svg';


import './styles.css';
import { getToken } from '../../services/auth';
import Loader from '../../components/Loader';
import PostList from '../../components/PostList';



const Search:React.FC = () => {
    
    const [searchText, setSearchText] = useState("");
    const [postList, SetPostList] = useState<PostInterface[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessagePost, setErrorMessagePost] = useState("");
    const history = useHistory();

    async function handleSearch(e:FormEvent) {
        e.preventDefault();

        setIsLoading(true);

       
        await api.get("/post", {
            params: {
                message_text: searchText
            }
            }).then(response => {
                console.log(response.data);
                var postList = response.data.data;
                console.log(postList);
                SetPostList(postList);
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
            <form className="post-comment-area" onSubmit={handleSearch}>
                <Input
                    name="searchText"
                    label=""
                    placeholder="Pesquisar"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button type="submit" isLoading={isLoading}>
                    <img src={searchIcon} alt=""/>
                </Button>
            </form>
            {isLoading ? 
                <Loader /> : (
                    <>
                        <PostList postList={postList || []} />
                    </>
                )}
        </div>
    );
}

export default Search;