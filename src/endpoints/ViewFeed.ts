import dayjs from "dayjs";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export const viewFeed = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string

        const authenticator = new Authenticator()
        const authData = authenticator.getData(token)

        const userDatabase = new UserDatabase()
        const feed = await userDatabase.getFeedById(authData.id)

        res.status(200).send({
            posts: feed.map((post: any) => {
                return {
                    type: post.post_type as string,
                    photo: post.post_photo,
                    description: post.post_description,
                    userName: post.name,
                    createdAt: dayjs(post.post_createdAt).format('YYYY-MM-DD hh:mm:ss')
                }
            })
        })

    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    } finally {
        BaseDatabase.destroyConnection()
    }
}