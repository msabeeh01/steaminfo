import express from 'express'
const steam_apps_info_router = express.Router()

// controller imports
import {GetAllApps} from '../controllers/steam_apps_info_controller'

steam_apps_info_router.get('/apps', GetAllApps)

export default steam_apps_info_router