import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "LabookUsers";

  public async createUser(id: string, name: string, email: string, password: string): Promise<void> {
    await this.getConnection()
    .insert({
      id,
      name,
      email,
      password
    })
    .into(UserDatabase.TABLE_NAME)
  }

  public async getUserByEmail (email: string): Promise<User> {
    const result = await this.getConnection()
    .select("*")
    .from(UserDatabase.TABLE_NAME)
    .where("email", email)

    const myUser = new User(result[0].id, result[0].name, result[0].email, result[0].password)
    return myUser
  }

  public async getUserById (id: string): Promise<User> {
    const result = await this.getConnection()
    .select("*")
    .from(UserDatabase.TABLE_NAME)
    .where("id", id)

    const myUser = new User(result[0].id, result[0].name, result[0].email, result[0].password)
    return myUser
  }
}