import dayjs from "dayjs";
import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { POST_TYPE } from "../data/PostsDatabase";

export const viewFeedperType = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string
        const type = req.params.type as POST_TYPE

        const postsBusiness = new PostBusiness()
        const feed = await postsBusiness.viewFeedperType(token, type)
        
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