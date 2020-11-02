import React from 'react';

import PostBlock from '../PostBlock';
import PostInterface from '../../interfaces/PostInterface';

interface PostListProps {
    postList:PostInterface[]
}   


const PostList: React.FC<PostListProps> = (props) => {
    const {
        postList
    } = props;


    return (
        <>
            {postList?.map((post:PostInterface) => {
                            return <PostBlock post={post}/>
            })}
        </>
    )
}

export default PostList;