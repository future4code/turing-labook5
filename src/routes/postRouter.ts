import express from 'express'
import { createPost } from '../endpoints/CreatePost'
import { viewFeed } from '../endpoints/ViewFeed'
import { viewFeedperType } from '../endpoints/ViewFeedperType'

export const postsRouter = express.Router()

postsRouter.post('/new', createPost)
postsRouter.get('/feed', viewFeed)
postsRouter.get('/feed/:type', viewFeedperType)