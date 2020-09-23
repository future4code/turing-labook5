import { BaseDatabase } from "./BaseDatabase";

export class FriendsDatabase extends BaseDatabase {
    private static TABLE_NAME = "LabookFriends"

    public async friendUser (user1:string, user2: string): Promise<void> {
        await this.getConnection()
        .insert({
          user1,
          user2,
        })
        .into(FriendsDatabase.TABLE_NAME)
    }

    public async unfriendUser (user1:string, user2: string): Promise<void> {
      await this.getConnection()
      .raw(`
          DELETE FROM ${FriendsDatabase.TABLE_NAME}
          WHERE user1 = "${user1}" AND user2 = "${user2}";
      `)
  }
}