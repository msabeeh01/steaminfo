import express from 'express'
import dotenv from 'dotenv'
// cors
import cors from 'cors'

//import routes
import user_info_router from './routes/user_info_route'
import steam_apps_info_router from './routes/steam_apps_info_route'
import itad_prices_router from './routes/itad_prices.route'

dotenv.config()
const app = express()
const port = 3001
app.use(cors())
app.use(express.json())

//use routes
app.use('/uInfo', user_info_router)
app.use('/aInfo', steam_apps_info_router)
app.use('/itad', itad_prices_router)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})