import React, { FormEvent, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Button from '../../components/Button';
import CommentBlock from '../../components/CommentBlock';
import Input from '../../components/Input';
import PostBlock from '../../components/PostBlock';
import ProfileBlock from '../../components/ProfileBlock';
import CommentInterface from '../../interfaces/CommentInterface';
import PostInterface from '../../interfaces/PostInterface';
import api from '../../services/api';
import sendIcon from '../../assets/images/icons/send.svg';
import { getToken } from '../../services/auth';
import './styles.css';

interface PostParam {
    id: string;
}

const Post: React.FC<RouteComponentProps<PostParam>> = (props) => {
    const [post, setPost] =  useState<PostInterface>({
        comments: 0,
        created_at: "",
        id: 0,
        message: "",
        user_id: 0
    });
    const [commentList, setCommentList] =  useState<CommentInterface[]>();
    const [commentText, setCommentText] =  useState("");
    const { match } = props;
    var id = match.params.id;
    
    

    useEffect(  () => {
        try{
             api.get("/post/"+id).then((response) => {
                console.log(response.data);
                var post = response.data.data[0];
                setPost(post);
        })
        } catch(err) {
            console.log("ERRO AO RECUPERAR / ME", err);
        }

        try{
            api.get("/post/"+id+"/comments").then((response) => {
               console.log(response.data);
               var comments = response.data.data;
               setCommentList(comments);
       })
       } catch(err) {
           console.log("ERRO AO RECUPERAR / ME", err);
       }
    },[match]);

    async function handleComment(e:FormEvent) {
        e.preventDefault();

        await api.post("/post/"+id+"/comments", {
            user_id: getToken(),
            comment: commentText
        }).then(response => {
            console.log(response.data);
            setCommentText("");
            try{
                api.get("/post/"+id).then((response) => {
                   console.log(response.data);
                   var post = response.data.data[0];
                   setPost(post);
           })
           } catch(err) {
               console.log("ERRO AO RECUPERAR / ME", err);
           }
            try{
                api.get("/post/"+id+"/comments").then((response) => {
                   console.log(response.data);
                   var comments = response.data.data;
                   setCommentList(comments);
           })
           } catch(err) {
               console.log("ERRO AO RECUPERAR / ME", err);
           }


        }).catch(err => {
            console.log("erro Post",{err});
            console.log("erro Post", err.data);
            console.log("erro Post", err?.response?.data?.message);
            //setErrorMessagePost(err?.response?.data?.message);

    });
        
    }
    

    return (
        <div className="container" >
            <PostBlock post={post} />
            <form className="post-comment-area" onSubmit={handleComment}>
                <Input
                    name="commentText"
                    label=""
                    placeholder="Comente"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <Button type="submit" >
                    <img src={sendIcon} alt=""/>
                </Button>
            </form>
            
            {commentList?.map(comment => { 
                return <CommentBlock comment={comment} />
            })}

        </div> 
    )
}

export default Post;