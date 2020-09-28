import { PostsDatabase, POST_TYPE } from "../data/PostsDatabase"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

export class PostBusiness {

  public async createPost (token: string, post_type: string, post_photo: string, post_description: string, post_createdAt: string) {
    if (!post_type || !post_description || !post_photo){
      throw new Error("Informe todos os dados!")
    }

    if(!post_type) {
      post_type = POST_TYPE.NORMAL
    }

      if (post_type !== POST_TYPE.EVENTO && post_type !== POST_TYPE.NORMAL) {
        throw new Error ("Parâmetro TYPE precisa ser preenchido com NORMAL ou EVENTO.")
    }

    const idGenerator = new IdGenerator()
    const newId = idGenerator.generateId()

    const authenticator = new Authenticator()
    const user = authenticator.getData(token)

    const postsDatabase = new PostsDatabase()
    await postsDatabase.createPost(newId, post_photo, post_description, post_createdAt, post_type, user.id)
  }

  public async viewFeed (token: string) {
    const authenticator = new Authenticator()
    const authData = authenticator.getData(token)

    const postsDatabase = new PostsDatabase()
    const feed = await postsDatabase.getFeedById(authData.id)

    return feed
  }

  public async viewFeedperType (token: string, type: POST_TYPE) {
    const authenticator = new Authenticator()
    const authData = authenticator.getData(token)

    const postsDatabase = new PostsDatabase()
    const feed = await postsDatabase.getFeedByType(authData.id, type)

    return feed
  }
}