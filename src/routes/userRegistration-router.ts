import { userRegistration } from '../controllers/userRegistration-controller';
import { Router } from 'express';

const userRegistrationRouter = Router();

userRegistrationRouter.post("/", userRegistration)

export {userRegistrationRouter}