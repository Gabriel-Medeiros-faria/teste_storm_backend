import { Request, Response } from "express";
import movieRegistrationService from "../services/movieRegistration-service";

export async function movieRegistration(req: Request, res: Response){
    // Pego todos os parâmetros do body da requisição
    const {userId, title, description, director, gender, yearLaunch, imagePoster, actors} = req.body
    // Pego usuário que está logado e disponível porque disponibilizei ele no authMiddleware
    const localUser = res.locals.user

    try{
        // Chamo a funcão movieRegistration que está dentro de movieRegistrationService e passo os parâmentros
        await movieRegistrationService.movieRegistration(userId, title, description, director, gender, yearLaunch, imagePoster, localUser, actors)

        // Se tudo deu certo, retorno o status 201 que significa Created
        res.sendStatus(201)
    }catch(err){
        res.status(400).send(err)
    }
}

export async function moviesGet(req: Request, res: Response) {
    try{
        const movies = await movieRegistrationService.moviesGet()
        res.send(movies).status(200)
    }catch(err){
        res.status(400).send(err)
    }
}

export async function movieGetById(req: Request, res: Response) {
    const {id} = req.params
    try{
        const movie = await movieRegistrationService.movieGetById(Number(id))
        res.send(movie).status(200)
    }catch(err){
        res.status(400).send(err)
    }
}

export async function movieBySearchBar(req: Request, res: Response) {
    const {search} = req.body

    try{
        const resultSearch = await movieRegistrationService.movieBySearchBar(search)
        res.send(resultSearch).status(200)
    }catch(err){
        res.status(400).send(err)
    }
}