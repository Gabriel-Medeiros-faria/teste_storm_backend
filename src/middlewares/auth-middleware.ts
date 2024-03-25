import { NextFunction, Request, Response } from "express";
import user from "interfaces/user-interface";
import jwt from "jsonwebtoken";
import userRegistrationRepository from "../repositories/userRegistration-repository";

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

    const userByEmail = await userRegistrationRepository.getUserByEmail(user.email)
    // Coloco o usuário na res.locals.user para poder usá-lo no resto do código 
    res.locals.user = userByEmail;
    return next()
}