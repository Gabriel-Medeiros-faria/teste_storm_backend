import { NextFunction, Request, Response } from "express";
import user from "interfaces/user-interface";
import jwt from "jsonwebtoken";

// Crio o middleware para verificar se o usuário 
export async function authMiddleware(req: Request, res: Response, next: NextFunction){
    const {authorization} = req.headers
    // Verifico se o authorization existe
    if(!authorization){
        return res.status(401).send("Campo authorization obrigatório")
    }
    const token = authorization.replace("Bearer ", "");

    // Verifico se o token existe
    if (!token) return res.status(401).send("Token não enviado");

    // Verifico o token que o usuário me enviou
    const decode = jwt.verify(token, `${process.env.JWT_SECRET}`);

    // Utilizo a interface de usuário para modelar o decode em cima dessa interface
    const user = decode as user;

    // Coloco o valor do id do usuário na res.locals.user para poder usálo no resto do código 
    res.locals.user = user.id;
    return next()
}