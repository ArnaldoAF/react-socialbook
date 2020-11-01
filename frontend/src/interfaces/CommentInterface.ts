import UserInterface from './UserInterface';
import PostInterface from './PostInterface';


export default interface CommentInterface {
    id: number,
    user:UserInterface,
    post: PostInterface,
    comment: string,
    user_id: number,
    post_id: number,
    created_at: string
}