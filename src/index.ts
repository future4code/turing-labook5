import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { createUser } from "./endpoints/CreateUser";
import { login } from './endpoints/Login'
import { becomeFriends } from './endpoints/BecomeFriends'
import { removeFriend } from './endpoints/RemoveFriend'
import { createPost } from './endpoints/CreatePost'
import { viewFeed } from './endpoints/ViewFeed'
import { viewFeedperType } from './endpoints/ViewFeedperType'

dotenv.config();

const app = express();

app.use(express.json());

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

app.put('/signup', createUser)
app.post('/login', login)
app.post('/friendUser', becomeFriends)
app.post('/unfriendUser', removeFriend)
app.post('/post', createPost)
app.get('/feed', viewFeed)
app.get('/feed/:type', viewFeedperType)