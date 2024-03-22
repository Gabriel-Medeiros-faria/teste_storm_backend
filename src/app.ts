import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import axios from "axios";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .get("/CPF/:cpf", (req: Request, res: Response) => {
    const { cpf } = req.params;
    axios
      .get(
        `https://api.arcadiancenter.com/token/050fdbe1-46cd-4808-b4bf-44ffc89cd801/CpfModerado/${cpf}`
      )
      .then((resp) => res.send(resp.data))
      .catch((err) => console.log(err));
  });

const port = +`${process.env.PORT}` || 8080;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}.`);
});

export default app;