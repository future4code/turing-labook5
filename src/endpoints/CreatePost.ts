import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";
import dayjs from 'dayjs'
import { PostsDatabase, POST_TYPE } from "../data/PostsDatabase";

export const createPost = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string

        if (!req.body.post_type || !req.body.post_description || !req.body.post_photo){
            throw new Error("Informe todos os dados!")
        }

        const postData = {
            type: req.body.post_type,
            photo: req.body.post_photo,
            description: req.body.post_description,
            createdAt: dayjs().format('YYYY-MM-DD hh:mm:ss')
        }

        if(!postData.type) {
          postData.type = POST_TYPE.NORMAL
      }

        if (postData.type !== POST_TYPE.EVENTO && postData.type !== POST_TYPE.NORMAL) {
          throw new Error ("Parâmetro TYPE precisa ser preenchido com NORMAL ou EVENTO.")
      }

        const idGenerator = new IdGenerator()
        const newId = idGenerator.generateId()

        const authenticator = new Authenticator()
        const user = authenticator.getData(token)

        const postsDatabase = new PostsDatabase()
        await postsDatabase.createPost(newId, postData.photo, postData.description, postData.createdAt, postData.type, user.id)

        res.status(200).send({
            message: "Post criado com sucesso!"
        })
    } catch (error) {
        res.status(400).send({message: error.message})
    } finally {
        BaseDatabase.destroyConnection()
    }
}