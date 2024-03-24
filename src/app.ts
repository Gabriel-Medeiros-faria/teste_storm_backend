import express from "express";
import cors from "cors";
import { userRegistrationRouter } from "./routes/userRegistration-router";
import { userLoginRouter } from "./routes/userLogin-router";

const app = express();

app
  .use(cors())
  .use(express.json())
  
  // Rotas para chamadas de API 
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/userRegistration", userRegistrationRouter)
  .use("/userLogin", userLoginRouter)

const port = +`${process.env.PORT}` || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}.`);
});

export default app;