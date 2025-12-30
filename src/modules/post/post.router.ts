
import express, { Application } from 'express'
import { postController } from './post.controller'
import auth from '../../middleware/auth'

const router = express.Router()
router.post('/',auth("USER"), postController.createPost)
router.get('/', postController.getAllPost)
router.get('/:id', postController.getUniquePost)


export  const postRouter=router