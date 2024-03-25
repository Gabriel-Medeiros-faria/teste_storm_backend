import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { userRegistrationRouter } from "./routes/userRegistration-router";
import { userLoginRouter } from "./routes/userLogin-router";
import { movieRegistrationRouter } from "./routes/movieRegistration-router";

const app = express();

app
  .use(cors())
  .use(bodyParser.json({ limit: '50mb' }))
  .use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  .use(express.json())

  // Rotas para chamadas de API 
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/userRegistration", userRegistrationRouter)
  .use("/userLogin", userLoginRouter)
  .use("/movieRegistration", movieRegistrationRouter)

const port = +`${process.env.PORT}` || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}.`);
});

export default app;