import express from'express'
import {toolController } from './tool.controller'
 const router = express.Router()

 router.post('/createTool',toolController.createTool)
 router.get('/',toolController.getAllTool)
 router.get('/:id',toolController.getSingleTool)
 router.patch('/:id',toolController.updateById)
 router.delete('/:id',toolController.deleteById)





export const toolRouter = router; 