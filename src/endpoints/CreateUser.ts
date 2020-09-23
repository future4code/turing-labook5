import { Request, Response } from "express";
import { BaseDatabase } from "../data/BaseDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export const createUser = async (req: Request, res: Response) => {
    try {
        if (!req.body.name || !req.body.email || !req.body.password){
            throw new Error("Por favor informe todos os dados")
        }

        if(req.body.email.indexOf("@") === -1) {
            throw new Error("Email inválido")
        }

        if (req.body.password.length < 6) {
            throw new Error("A senha deve ter no mínimo 6 caracteres")
        }

        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }       

        const idGenerator = new IdGenerator()
        const newId = idGenerator.generateId()

        const hashManager = new HashManager()
        const cypherPassword = await hashManager.hash(userData.password)

        const userDatabase = new UserDatabase()
        await userDatabase.createUser(newId, userData.name, userData.email, cypherPassword)

        const authenticator = new Authenticator()
        const token = authenticator.generateToken({
            id: newId
        })

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