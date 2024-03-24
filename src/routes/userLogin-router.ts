import { userLogin } from '../controllers/userLogin-controller';
import { Router } from 'express';

const userLoginRouter = Router();

userLoginRouter.post("/", userLogin)

export {userLoginRouter}