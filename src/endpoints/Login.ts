import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";

export const login = async (req: Request, res: Response) => {
    try {
        const userData = {
            email: req.body.email,
            password: req.body.password
        }

        const userBusiness = new UserBusiness()
        const token = await userBusiness.login(userData.email, userData.password)

        const userDatabase = new UserDatabase()
        const user = await userDatabase.getUserByEmail(userData.email)

        res.status(200).send({
            message: `Usuário logado com sucesso! Bem vindo(a) de volta, ${user.name}.`,
            token: token
        })
    } catch (error) {
        res.status(400).send({message: error.message})
    } finally{
        BaseDatabase.destroyConnection()
    }
}