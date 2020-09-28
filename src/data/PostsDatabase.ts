import { BaseDatabase } from "./BaseDatabase";


export class PostsDatabase extends BaseDatabase {
    private static TABLE_NAME = "LabookPosts"

    public async createPost(post_id: string, post_photo: string, post_description: string, post_createdAt: string, post_type: POST_TYPE, post_userId: string ): Promise<void> {
        await this.getConnection()
        .insert({
            post_id,
            post_photo,
            post_description,
            post_createdAt,
            post_type,
            post_userId
        })
        .into(PostsDatabase.TABLE_NAME)
    }
    
    public async getFeedById (user_id: string): Promise<any> {
      const response = await this.getConnection()
      .raw(`
          SELECT post_id, post_photo, post_description, post_type, post_createdAt, post_userId, name
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
          WHERE LabookFriends.user1 = "${user_id}" AND LabookPosts.post_type = "${post_type}"
          ORDER BY post_createdAt DESC;
      `)
      return response[0]
    }
} 

export enum POST_TYPE{
  NORMAL = "NORMAL",
  EVENTO = "EVENTO"
}