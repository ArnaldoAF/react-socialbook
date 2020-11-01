import {Request, Response} from 'express';
import db from '../database/connections';


export default class PostController {
    async create(request: Request, response:Response) {
        console.log('------------------------------');
        console.log('📫 PostController - create');

        try {
            const {
                user_id,
                message
            } = request.body;

            const selectedUser = await db('users').where({id: user_id});

            if(selectedUser.length == 0) {
                console.log("⚠️  WARNING - Usuário não encontrado - id: "+user_id);
                return response.status(400).json({
                    error: "error while creating a new Post",
                    detail: "Usuario não existe"
                });
            }
    
            const insertedPostsIds = await db('posts').insert({
                user_id,
                message
            });
    
            console.log("✅ Sucesso - "+insertedPostsIds);
    
            return response.status(201).json({
                "message":"Inserido com sucesso",
                "id": insertedPostsIds
            })

        }catch(err) {
            console.log("⚠️ ERRO");
            console.log(err);
            return response.status(400).json({
                error: "error while creating a new Post",
                detail: err
            });
        }
    }

    async index(request: Request, response:Response) {
        console.log('------------------------------');
        console.log('📫 PostController - index');

        try {  
            const {id} = request.params;
            const filters = request.query;
            
            const user_id = filters.user_id as string;
            const message_text = filters.message_text as string;

            
            const posts = await db('posts')
                                .modify(function(queryBuilder) {
                                    if (id) queryBuilder.where({id:id});
                                    if (user_id) queryBuilder.where({user_id:user_id})
                                    if (message_text) queryBuilder.where('message', 'like', `%${message_text}%`)
                                })
                                .select('*');
            

            if(id && !posts.length) {
                console.log("⚠️  WARNING - Post não encontrado - id: "+id);
                return response.status(404).json({
                    "message":"Post não encontrado"
                })
            }

            

            Promise.all(posts.map(async (post:any) => {
                
                const commentsCount = await db('comments').count('*', {as: 'total'}).where('post_id','=',post.id);
                const user = await db('users').where('id','=',post.user_id);

                return {
                    ...post,
                    comments:commentsCount[0].total,
                    user:user[0]
                }
            })).then((postList) => {
                console.log("✅ Prommise Completa");
                
                return response.status(200).json({
                    "message":"Recuperado com sucesso",
                    "data": postList
                })
            });

            console.log("✅ Sucesso - ");
            //console.log(postsWithInfo);
    
            

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
        console.log('📫 PostController - update');

        try {
            const {
                id,
                message
            } = request.body;

            const updatedPosts = await db('posts')
                                        .where({id: id})
                                        .update({
                                            message: message
                                        });

            if(updatedPosts == 0) {
                console.log("⚠️  WARNING - Usuário não encontrado - id: "+id);
            }

            console.log("✅ Sucesso - "+updatedPosts);
    
            return response.status(201).json({
                "message":"Atualizado com Sucesso",
                "data": updatedPosts
            })

        }catch(err) {
            console.log("⚠️ ERRO");
            console.log(err);
            return response.status(400).json({
                error: "error while creating a new Post",
                detail: err
            });
        }
    }

    async delete(request: Request, response:Response) {
        console.log('------------------------------');
        console.log('📫 PostController - delete');

        try {  
            const {id} = request.params;
            
            const posts = await db('posts').where({id: id}).delete();

            if(!posts) {
                console.log("⚠️  WARNING - Post não encontrado - id: "+id);
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
                error: "error while creating a new Post",
                detail: err
            });
        }

    }
}