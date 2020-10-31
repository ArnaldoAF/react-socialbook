import {Request, Response} from 'express';
import db from '../database/connections';


export default class UserController {
    async create(request: Request, response:Response) {

        console.log('------------------------------');
        console.log('👤 UserController - create');

        try {
            const {
                name,
                bio
            } = request.body;
    
            const insertedUserIds = await db('users').insert({
                name,
                bio
            });
    
            console.log("✅ Sucesso - "+insertedUserIds);
    
            return response.status(201).json({
                "message":"Inserido com sucesso",
                "id": insertedUserIds
            })

        }catch(err) {
            console.log("⚠️ ERRO");
            console.log(err);
            return response.status(400).json({
                error: "error while creating a new User",
                message: (err.code ==="SQLITE_CONSTRAINT" && "Usuário já existe"),
                detail: err
            });
        }
    }

    async select(request: Request, response:Response) {
        console.log('------------------------------');
        console.log('👤 UserController - select');

        try {
            const {
                id
            } = request.params;
            
            var countPosts = await db('posts').count('* as posts')
                                .where({user_id: id});
                                console.log(countPosts);

            var countComments = await db('comments').count('* as comments')
                                    .where({user_id: id});

            const selectedUser = await db('users')
                                        .where('users.id','=',id)
                                        .select('*')
                                        .select(countPosts)
                                        .select(countComments);


            if(!selectedUser || selectedUser.length == 0) {
                console.log("⚠️  ERRO - Usuário não encontrado - id: "+id);
                return response.status(404).json({
                    "message":"Usuario não encontrado"
                })
            }
    
            console.log("✅ Sucesso ",{selectedUser});
    
            return response.status(201).json({
                "message":"Recuperado com sucesso",
                "data": selectedUser
            })

        }catch(err) {
            console.log("⚠️ ERRO");
            console.log(err);
            console.log(err.code);
            
            return response.status(400).json({
                error: "error while recovering User",
                
                detail: err
            });
        }
    }

    async update(request: Request, response:Response) {
        console.log('------------------------------');
        console.log('👤 UserController - update');

        try {
            const {
                id,
                name,
                bio
            } = request.body;

            const updatedUsers = await db('users')
                                        .where({id: id})
                                        .update({
                                            name,bio
                                        });

            if(updatedUsers == 0) {
                console.log("⚠️  WARNING - Usuário não encontrado - id: "+id);
            }
    
            console.log("✅ Sucesso - "+updatedUsers);
    
            return response.status(201).json({
                "message":"Atualizado com Sucesso",
                "data": updatedUsers
            })

        }catch(err) {
            console.log("⚠️ ERRO");
            console.log(err);
            return response.status(400).json({
                error: "error while updating User",
                detail: err
            });
        }
    }

    async login(request: Request, response:Response) {
        console.log('------------------------------');
        console.log('👤 UserController - login');

        try {
            const filters = request.query;
            
            const username = filters.username as string;
            

            const selectedUser = await db('users')
                                        .where('users.name','like',`${username}`)
                                        .select('id');


            if(!selectedUser || selectedUser.length == 0) {
                console.log("⚠️  ERRO - Usuário não encontrado - name: "+username);
                return response.status(404).json({
                    "message":"Usuario não encontrado"
                })
            }
    
            console.log("✅ Sucesso ",{selectedUser});
    
            return response.status(201).json({
                "message":"Recuperado com sucesso",
                "data": selectedUser[0].id
            })

        }catch(err) {
            console.log("⚠️ ERRO");
            console.log(err);
            return response.status(400).json({
                error: "error while recovering User",
                detail: err
            });
        }
    }
}