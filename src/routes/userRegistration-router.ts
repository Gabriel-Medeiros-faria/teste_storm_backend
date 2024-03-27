import { authMiddleware } from "../middlewares/auth-middleware";
import {
  userDelete,
  userRegistration,
  userUpdate,
} from "../controllers/userRegistration-controller";
import { Router } from "express";

const userRegistrationRouter = Router();

// Utilizo o authMiddleware para autenticar a rota 
userRegistrationRouter
  .post("/", authMiddleware, userRegistration)
  .put("/", authMiddleware, userUpdate)
  .delete("/", authMiddleware, userDelete)

export { userRegistrationRouter };
