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
} 

export enum POST_TYPE{
  NORMAL = "NORMAL",
  EVENTO = "EVENTO"
}