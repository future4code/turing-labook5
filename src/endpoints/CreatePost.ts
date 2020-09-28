import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import dayjs from 'dayjs'
import { PostBusiness } from "../business/PostBusiness";

export const createPost = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string

        const postData = {
            type: req.body.post_type,
            photo: req.body.post_photo,
            description: req.body.post_description,
            createdAt: dayjs().format('YYYY-MM-DD hh:mm:ss')
        }
        
        const postBusiness = new PostBusiness()
        await postBusiness.createPost(token, postData.type, postData.photo, postData.description, postData.createdAt)

        res.status(200).send({
            message: "Post criado com sucesso!"
        })
    } catch (error) {
        res.status(400).send({message: error.message})
    } finally {
        BaseDatabase.destroyConnection()
    }
}