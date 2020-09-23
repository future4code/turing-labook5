import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { FriendsDatabase } from "../data/FriendsDatabase";

export const becomeFriends = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization as string

        const friendData = {
          userToFriendId: req.body.userToFriendId
        }

        if (!req.body.userToFriendId && req.body.userToFriendId.length > 0){
            throw new Error("Informe o id do usuário para fazer amizade.")
        }

        const authenticator = new Authenticator()
        const user = authenticator.getData(token)

        const userDb = new UserDatabase()
        const userToFriend = await userDb.getUserById(friendData.userToFriendId)

        if(user.id === friendData.userToFriendId){
          throw new Error(`Você não pode fazer uma amizade com você mesmo.`)
        }

        const friendDb = new FriendsDatabase()
        await friendDb.friendUser(user.id, friendData.userToFriendId)
        await friendDb.friendUser(friendData.userToFriendId, user.id)

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