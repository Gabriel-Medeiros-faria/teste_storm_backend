import { authMiddleware } from "../middlewares/auth-middleware";
import { Router } from "express";
import {
    movieBySearchBar,
  movieGetById,
  movieRegistration,
  moviesGet,
} from "../controllers/movieRegistration-controller";

const movieRegistrationRouter = Router();

movieRegistrationRouter
  .post("/", authMiddleware, movieRegistration)
  .get("/", authMiddleware, moviesGet)
  .get("/:id", authMiddleware, movieGetById)
  .post("/search", authMiddleware, movieBySearchBar)

export { movieRegistrationRouter };
