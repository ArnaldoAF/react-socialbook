import React, { FormEvent, useState } from 'react';

import api from '../../services/api';

import './styles.css';
import searchIcon from '../../assets/images/icons/search.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Loader from '../../components/Loader';
import PostList from '../../components/PostList';

import PostInterface from '../../interfaces/PostInterface';


const Search:React.FC = () => {
    
    const [searchText, setSearchText] = useState("");
    const [postList, SetPostList] = useState<PostInterface[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSearch(e:FormEvent) {
        e.preventDefault();

        setIsLoading(true);

        setErrorMessage("");
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
            setErrorMessage(err?.response?.data?.message);

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
                        <p>{errorMessage}</p>
                        <PostList postList={postList || []} />
                    </>
                )}
        </div>
    );
}

export default Search;