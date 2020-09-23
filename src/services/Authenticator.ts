import * as jwt from 'jsonwebtoken'

export class Authenticator {
  public generateToken(data: AuthenticationData): string {
    const token = jwt.sign(
      {
        id: data.id,
        email: data.email
      },
      process.env.JWT_KEY as string,
      {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string}
    )
    return token
  }

  public getData(token: string): AuthenticationData {
    const data = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: data.id,
      email: data.email,
    }
    return result
  }
}

export interface AuthenticationData {
  id: string,
  email: string
}