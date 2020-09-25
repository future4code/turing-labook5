import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserBusiness } from "../business/UserBusiness";

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string
        const userToUnfriendId = req.body.userToUnfriendId as string
        
        const userBusiness = new UserBusiness()
        const userToUnfriend = await userBusiness.removeFriend(token, userToUnfriendId)
        
        res.status(200).send({
            message: `Você desfez sua amizade com ${userToUnfriend.name}.`
        })
    } catch (error) {
        res.status(400).send({message: error.message})
    } finally {
        BaseDatabase.destroyConnection()
    }
}