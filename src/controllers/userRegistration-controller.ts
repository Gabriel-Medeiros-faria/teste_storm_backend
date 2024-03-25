import { Request, Response } from "express";
import userRegistrationService from "../services/userRegistration-service";

export async function userRegistration(req: Request, res: Response){
    // Pego todos os parâmetros do body da requisição
    const {username, email, password, isAdmin} = req.body

    // Pego usuário que está logado e disponível porque disponibilizei ele no authMiddleware
    const user = res.locals.user

    try{
        // Mando para o service userRegistrationService para fazer a validação da regra de negócio
        await userRegistrationService.userRegistration(username, email, password, isAdmin, user)

        // Se tudo deu certo, retorno o status 201 que significa Created
        res.sendStatus(201)
    }catch(err){
        res.status(400).send(err)
    }
}

export async function userUpdate(req: Request, res: Response) {
    // Pego todos os parâmetros do body da requisição
    const {username, email, password} = req.body

    // Pego usuário que está logado e disponível porque disponibilizei ele no authMiddleware
    const localUser = res.locals.user

    try{
        // Mando para o service userRegistrationService para fazer a validação da regra de negócio
        await userRegistrationService.userUpdate(username, email, password, localUser)

        // Se tudo deu certo, retorno o status 201 que significa Created
        res.sendStatus(201)
    }catch(err){
        res.status(400).send(err)
    }
}

export async function userDelete(req: Request, res: Response) {
    // Pego todos os parâmetros do body da requisição
    const {userId} = req.body
    console.log(userId)
    try{
        await userRegistrationService.userDelete(userId)
        res.sendStatus(200)
    }catch(err){
        res.status(400).send(err)
    }
}