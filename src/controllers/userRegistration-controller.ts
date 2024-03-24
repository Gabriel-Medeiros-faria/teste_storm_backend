import { Request, Response } from "express";
import userRegistrationService from "../services/userRegistration-service";

export async function userRegistration(req: Request, res: Response){
    // Pego todos os parâmetros do body da requisição
    const {username, email, password, isAdmin} = req.body


    try{
        // Mando para o service userRegistrationService para fazer a validação da regra de negócio
        await userRegistrationService.userRegistration(username, email, password, isAdmin)

        // Se tudo deu certo, retorno o status 201 que significa Created
        res.sendStatus(201)
    }catch(err){
        res.status(400).send(err)
    }
}