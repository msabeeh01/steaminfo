import express from 'express'
const user_info_router = express.Router()

// controller imports
import { GetPlayerSummaries } from '../controllers/user_info_controller'

user_info_router.post('/summaries', GetPlayerSummaries)

export default user_info_router 