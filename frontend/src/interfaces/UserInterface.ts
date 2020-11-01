export default interface UserInterface {
    id: number,
    name: string,
    bio?: string,
    created_at: string,
    posts?:number,
    comments?:number
}