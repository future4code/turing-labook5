import dayjs from "dayjs";
import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { POST_TYPE } from "../data/PostsDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";

export const viewFeedperType = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string
        const type = req.params.viewFeedperType as POST_TYPE

        const authenticator = new Authenticator()
        const authData = authenticator.getData(token)

        const userDatabase = new UserDatabase()
        const feed = await userDatabase.getFeedByType(authData.id, type)

        res.status(200).send({
            posts: feed.map((post: any) => {
                return {
                    id: post.post_id,
                    photo: post.post_photo,
                    description: post.post_description,
                    type: post.post_type,
                    createdAt: dayjs(post.post_createdAt).format('YYYY-MM-DD hh:mm:ss'),
                    userId: post.post_userId,
                    userName: post.name
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