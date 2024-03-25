import { Request, Response } from "express";
import rateMovieService from "../services/rateMovie-service";

export async function rateMovie(req: Request, res: Response) {
    const {userId, movieId, assessment} = req.body

    try{
        await rateMovieService.rateMovie(userId, movieId, assessment)
        res.sendStatus(201)
    }catch(err){
        res.status(400).send(err)
    }
}