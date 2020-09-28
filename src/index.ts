import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { userRouter } from "./routes/userRouter";
import { postsRouter } from "./routes/postRouter";

dotenv.config();

const app = express();

app.use(express.json());

app.use('/user', userRouter)
app.use('/posts', postsRouter)

const server = app.listen(3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});

app.get("/teste", async (req: Request, res: Response) => {

  try {
      res.status(200).send("Oi, seu server está funcionando!");
  } catch (error) {

      res.status(400).send("ERRO");

  }
});

