import { authMiddleware } from "../middlewares/auth-middleware";
import {
  userRegistration,
  userUpdate,
} from "../controllers/userRegistration-controller";
import { Router } from "express";

const userRegistrationRouter = Router();

userRegistrationRouter
  .post("/", authMiddleware, userRegistration)
  .put("/", authMiddleware, userUpdate);

export { userRegistrationRouter };
