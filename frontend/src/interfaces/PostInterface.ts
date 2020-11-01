import UserInterface from './UserInterface';

export default interface PostInterface {
    comments: number,
    created_at: string,
    id: number,
    message: string,
    user?: UserInterface,
    user_id: number
}