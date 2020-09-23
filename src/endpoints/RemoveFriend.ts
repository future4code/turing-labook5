import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { FriendsDatabase } from "../data/FriendsDatabase";

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string

        if (!req.body.userToUnfriendId && req.body.userToUnFriendId.length > 0){
            throw new Error("Informe o id do usuário que deseja desfazer a amizade.")
        }

        const friendData = {
            userToUnfriendId: req.body.userToUnfriendId
        }

        const authenticator = new Authenticator()
        const user = authenticator.getData(token)

        const userDb = new UserDatabase()
        const userToUnfriend = await userDb.getUserById(friendData.userToUnfriendId)

        const friendDb = new FriendsDatabase()
        await friendDb.unfriendUser(user.id, friendData.userToUnfriendId)
        await friendDb.unfriendUser(friendData.userToUnfriendId, user.id)

        res.status(200).send({
            message: `Você desfez sua amizade com ${userToUnfriend.name}.`
        })
    } catch (error) {
        res.status(400).send({message: error.message})
    } finally {
        BaseDatabase.destroyConnection()
    }
}