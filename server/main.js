import express from 'express'
import dotenv from 'dotenv'

//import routes
import user_info_router from './routes/user_info_route'

dotenv.config()
const app = express()
const port = 3001


app.use(express.json())

//use routes
app.use('/uInfo', user_info_router)

app.get('/', (req, res) => {
    res.send('HELLO WORLD')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})