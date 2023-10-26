import express from 'express'
const steam_apps_info_router = express.Router()

// controller imports
import {GetAllApps, GetAppDetails, GetAppPlayers} from '../controllers/steam_apps_info_controller'

// aInfo/apps
steam_apps_info_router.get('/apps', GetAllApps)

// aInfo/appPlayers
steam_apps_info_router.get('/appPlayers/:appID', GetAppPlayers)


//aInfo/appDetails
steam_apps_info_router.get('/appDetails/:appID', GetAppDetails)

export default steam_apps_info_router