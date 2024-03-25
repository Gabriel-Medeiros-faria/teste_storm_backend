import { authMiddleware } from '../middlewares/auth-middleware';
import { Router } from 'express';
import { movieRegistration } from '../controllers/movieRegistration-controller';

const movieRegistrationRouter = Router();

movieRegistrationRouter.post("/", authMiddleware, movieRegistration)

export {movieRegistrationRouter}