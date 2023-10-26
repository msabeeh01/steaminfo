import express from 'express'
const itad_prices_router = express.Router()

// controller imports
import {GetPrices} from '../controllers/itad_controller'

itad_prices_router.get('/prices/:title', GetPrices)

export default itad_prices_router
