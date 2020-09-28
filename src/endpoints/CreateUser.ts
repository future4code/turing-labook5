import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserBusiness } from "../business/UserBusiness"

export const createUser = async (req: Request, res: Response) => {
    try {
        
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }

        const userBusiness = new UserBusiness()
        const token = await userBusiness.createUser(userData.name, userData.email, userData.password)

        res.status(200).send({
            message: `Usuário cadastrado com sucesso! Seja bem vindo(a), ${req.body.name}, você está agora logado(a).`,
            token: token
        })
    } catch (error) {
      if(error.message.includes("ER_DUP_ENTRY")){
        res.status(400).send({message: "Esse email já está cadastrado."})
      }
        res.status(400).send({message: error.message})
    } finally {
        BaseDatabase.destroyConnection()
    }
}