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

  public async getUserByEmail (email: string): Promise<any> {
    const response = await this.getConnection()
    .select("*")
    .from(UserDatabase.TABLE_NAME)
    .where("email", email)
    return response[0]
}

  public async getUserById (id: string): Promise<any> {
    const response = await this.getConnection()
    .select("*")
    .from(UserDatabase.TABLE_NAME)
    .where("id", id)
    return response[0]
}
}