import { BaseDatabase } from "./BaseDatabase"
import { POST_TYPE } from "./PostsDatabase";

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

  public async getFeedById (user_id: string): Promise<any> {
    const response = await this.getConnection()
    .raw(`
        SELECT post_id, post_photo, post_description, post_createdAt, post_userId, name
        FROM LabookUsers
        JOIN LabookPosts on LabookUsers.id = LabookPosts.post_userId
        JOIN LabookFriends on LabookPosts.post_userId = LabookFriends.user2
        WHERE LabookFriends.user1 = "${user_id}"
        ORDER BY post_createdAt DESC;
    `)
    return response[0]
  }

  public async getFeedByType (user_id: string, post_type: POST_TYPE): Promise<any> {
    const response = await this.getConnection()
    .raw(`
        SELECT post_id, post_photo, post_description, post_createdAt, post_userId, name
        FROM LabookUsers
        JOIN LabookPosts on LabookUsers.id = LabookPosts.post_userId
        JOIN LabookFriends on LabookPosts.post_userId = LabookFriends.user2
        WHERE LabookFriends.user1 = "${user_id}" and post_type = "${post_type}"
        ORDER BY post_createdAt DESC;
    `)
    return response[0]
  }
}