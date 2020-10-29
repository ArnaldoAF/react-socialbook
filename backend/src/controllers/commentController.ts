import {Request, Response} from 'express';
import db from '../database/connections';


export default class PostController {
    async create(request: Request, response:Response) {
        console.log('------------------------------');
        console.log('💬 CommentController - create');

        try {
            const {id} = request.params;
            
            const {
                user_id,
                comment
            } = request.body;

            const selectedUser = await db('users').where({id: user_id});

            if(selectedUser.length == 0) {
                console.log("⚠️  WARNING - Usuário não encontrado - id: "+user_id);
                return response.status(400).json({
                    error: "error while creating a new Comment",
                    detail: "Usuario não existe"
                });
            }

            const selectedPost = await db('posts').where({id: id});

            if(selectedPost.length == 0) {
                console.log("⚠️  WARNING - Post não encontrado - id: "+id);
                return response.status(400).json({
                    error: "error while creating a new Comment",
                    detail: "Post não existe"
                });
            }
    
            const insertedComments = await db('comments').insert({
                user_id,
                post_id:id,
                comment
            });
    
            console.log("✅ Sucesso - "+insertedComments);
    
            return response.status(201).json({
                "message":"Inserido com sucesso",
                "id": insertedComments
            })

        }catch(err) {
            console.log("⚠️ ERRO");
            console.log(err);
            return response.status(400).json({
                error: "error while creating a new Comment",
                detail: err
            });
        }
    }

    async index(request: Request, response:Response) {
        console.log('------------------------------');
        console.log('💬 CommentController - index');

        try {  
            const {id, comment_id} = request.params;
            const filters = request.query;
            
            const user_id = filters.user_id as string;
            const comment_text = filters.comment_text as string;
            
            const comments = await db('comments')
                                .modify(function(queryBuilder) {
                                    if (comment_id) queryBuilder.where({id:comment_id});
                                    if (id) queryBuilder.where({post_id:id})
                                    if (user_id) queryBuilder.where({user_id:user_id})
                                    if (comment_text) queryBuilder.where('comment', 'like', `%${comment_text}%`)
                                })   
            

            if(comment_id && !comments.length) {
                console.log("⚠️  WARNING - comentario não encontrado - id: "+comment_id);
                return response.status(404).json({
                    "message":"Post não encontrado"
                })
            }

            Promise.all(comments.map(async (comment:any) => {
                const post = await db('posts').where('id','=',comment.post_id);
                const user = await db('users').where('id','=',comment.user_id);

                return {
                    ...comment,
                    post:post[0],
                    user:user[0]
                }
            })).then(commentList => {
                console.log("✅ Prommise Completa");
                
                return response.status(200).json({
                    "message":"Recuperado com sucesso",
                    "data": commentList
                })
            });
            console.log("✅ Sucesso - "+[comments]);

        }catch(err) {
            console.log("⚠️ ERRO");
            console.log(err);
            return response.status(400).json({
                error: "error while creating a new Post",
                detail: err
            });
        }

    }

    async update(request: Request, response:Response) {
        console.log('------------------------------');
        console.log('💬 CommentController - update');

        try {
            const {
                id,
                comment
            } = request.body;

            const updatedPComments = await db('comments')
                                        .where({id: id})
                                        .update({
                                            comment: comment
                                        });

            if(updatedPComments == 0) {
                console.log("⚠️  WARNING - Comentario não encontrado - id: "+id);
            }

            console.log("✅ Sucesso - "+updatedPComments);
    
            return response.status(201).json({
                "message":"Atualizado com Sucesso",
                "data": updatedPComments
            })

        }catch(err) {
            console.log("⚠️ ERRO");
            console.log(err);
            return response.status(400).json({
                error: "error while creating a new Comment",
                detail: err
            });
        }
    }

    async delete(request: Request, response:Response) {
        console.log('------------------------------');
        console.log('💬 CommentController - delete');

        try {  
            const {id} = request.params;
            
            const posts = await db('comments').where({id: id}).delete();

            if(!posts) {
                console.log("⚠️  WARNING - Comment não encontrado - id: "+id);
            }
            
            
    
            console.log("✅ Sucesso - "+[posts]);
    
            return response.status(201).json({
                "message":"Deletado com sucesso",
                "data": posts
            })

        }catch(err) {
            console.log("⚠️ ERRO");
            console.log(err);
            return response.status(400).json({
                error: "error while creating a new Comment",
                detail: err
            });
        }

    }
}