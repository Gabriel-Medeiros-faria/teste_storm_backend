import { rateMovie } from "../controllers/rateMovie-controller";
import { authMiddleware } from "../middlewares/auth-middleware";
import { Router } from "express";

const rateMovieRouter = Router();

// Utilizo o authMiddleware para autenticar a rota 
rateMovieRouter
  .post("/", authMiddleware, rateMovie)

export { rateMovieRouter };
