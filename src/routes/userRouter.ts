import express from 'express'
import { becomeFriends } from '../endpoints/BecomeFriends'
import { createUser } from '../endpoints/CreateUser'
import { login } from '../endpoints/Login'
import { removeFriend } from '../endpoints/RemoveFriend'

export const userRouter = express.Router()

userRouter.put('/signup', createUser)
userRouter.post('/login', login)
userRouter.post('/addFriend', becomeFriends)
userRouter.post('/unfriend', removeFriend)