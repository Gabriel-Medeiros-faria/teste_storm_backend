import { Request, Response } from "express";
import movieRegistrationService from "../services/movieRegistration-service";

export async function movieRegistration(req: Request, res: Response){
    // Pego todos os parâmetros do body da requisição
    const {userId, title, description, director, gender, yearLaunch, imagePoster} = req.body

    // Pego usuário que está logado e disponível porque disponibilizei ele no authMiddleware
    const localUser = res.locals.user

    try{
        // Chamo a funcão movieRegistration que está dentro de movieRegistrationService e passo os parâmentros
        await movieRegistrationService.movieRegistration(userId, title, description, director, gender, yearLaunch, imagePoster, localUser)

        // Se tudo deu certo, retorno o status 201 que significa Created
        res.sendStatus(201)
    }catch(err){
        res.status(400).send(err)
    }
}