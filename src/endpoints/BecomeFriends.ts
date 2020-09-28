import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserBusiness } from "../business/UserBusiness";

export const becomeFriends = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string
        const userToFriendId = req.body.userToFriendId as string
        
        const userBusiness = new UserBusiness()
        const userToFriend = await userBusiness.becomeFriends(token, userToFriendId)

        res.status(200).send({
            message: `Agora você tem uma amizade com ${userToFriend.name}`
        })
    } catch (error) {
        if(error.message.includes("PRIMARY")){
            res.status(400).send({message: `Você já tem uma amizade com essa pessoa.`})
        }

        res.status(400).send({message: error.message})
    } finally {
        BaseDatabase.destroyConnection()
    }
}