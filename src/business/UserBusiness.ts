import { FriendsDatabase } from "../data/FriendsDatabase"
import { UserDatabase } from "../data/UserDatabase"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

export class UserBusiness {

  public async createUser (name: string, email: string, password: string): Promise<string> {
    if (!name || !email || !password){
      throw new Error("Por favor informe todos os dados")
    }

    if(email.indexOf("@") === -1) {
        throw new Error("Email inválido")
    }

    if (password.length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres")
    }
    
    const idGenerator = new IdGenerator()
    const newId = idGenerator.generateId()

    const hashManager = new HashManager()
    const cypherPassword = await hashManager.hash(password)

    const userDatabase = new UserDatabase()
    await userDatabase.createUser(newId, name, email, cypherPassword)

    const authenticator = new Authenticator()
    const token = authenticator.generateToken({
        id: newId
    })

    return token
  }

  public async login (email: string, password: string): Promise<string> {
    if (!email || !password) {
      throw new Error("Informe email e senha")
    }

    const userDatabase = new UserDatabase()
    const user = await userDatabase.getUserByEmail(email)

    const hashManager = new HashManager()
    const validatePassword = await hashManager.compare(password, user.getPassword())

    if(!validatePassword) {
        throw new Error("Usuário e/ou senha incorretos")
    }

    const authenticator = new Authenticator()
    const token = authenticator.generateToken({
      id: user.getId()
    })

    return token
  }

  public async becomeFriends (token: string, userToFriendId: string): Promise<any> {
    const authenticator = new Authenticator()
    const user = authenticator.getData(token)

    if (!userToFriendId && userToFriendId.length > 0){
      throw new Error("Informe o id do usuário para fazer amizade.")
    }

    if(user.id === userToFriendId){
      throw new Error(`Você não pode fazer uma amizade com você mesmo.`)
    }

    const userDb = new UserDatabase()
    const userToFriend = await userDb.getUserById(userToFriendId)

    const friendDb = new FriendsDatabase()
    await friendDb.friendUser(user.id, userToFriendId)
    await friendDb.friendUser(userToFriendId, user.id)

    return userToFriend
  }

  public async removeFriend (token: string, userToUnfriendId: string): Promise<any> {
    if (!userToUnfriendId && userToUnfriendId.length > 0){
      throw new Error("Informe o id do usuário que deseja desfazer a amizade.")
    }

    const authenticator = new Authenticator()
    const user = authenticator.getData(token)

    const userDb = new UserDatabase()
    const userToUnfriend = await userDb.getUserById(userToUnfriendId)

    const friendDb = new FriendsDatabase()
    await friendDb.unfriendUser(user.id, userToUnfriendId)
    await friendDb.unfriendUser(userToUnfriendId, user.id)

    return userToUnfriend
  }
}