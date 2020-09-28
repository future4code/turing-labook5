import dayjs from "dayjs";
import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export const viewFeed = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string

        const postsBusiness = new PostBusiness()
        const feed = await postsBusiness.viewFeed(token)

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