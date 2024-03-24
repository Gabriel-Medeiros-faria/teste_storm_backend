import { Request, Response } from "express";
import userLoginService from "../services/userLogin-service";

export async function userLogin(req: Request, res: Response) {
    const {email, password} = req.body
    try{
        const token = await userLoginService.userLogin(email, password)
        res.send(token).status(200)
    }catch(err){
        res.status(400).send(err)
    }
}