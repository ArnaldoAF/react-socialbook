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
    
            const selectedUser = await db('users').where({id: id});

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
}