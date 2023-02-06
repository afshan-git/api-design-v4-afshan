import express from 'express'
import router from './router'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'

const app = express()

const customLogger = (message) => (req,res,next) => {
    console.log(`Hello from ${message}`)
    next()
}

app.use(cors())  //a middleware
//configuration on server that will tell browser who can access API
//blocking or allowing browser

app.use(morgan('dev'))
//global console log of every route

app.use(express.json())
//allows client to send us JSON

app.use(express.urlencoded({extended: true}))
//allows a client to add things like query string ;parameters
//it decodes and encodes the query

//custon middleware
app.use(customLogger('custom logger'))
//any request that registed after this middleware will have access to req.shhh_secret


app.get('/',(req,res,next) => {
    res.json({message:"hello"})
})   

app.use('/api',protect, router)  
// allows to apply some global configuration

app.use('/user',createNewUser)
app.post('/signin',signin)

app.use((err,req,res,next) => {
    if(err.type === 'auth'){
        res.status(401).json({message: 'unauthorized'})
    }
    else if(err.type === 'input'){
        res.status(400).json({message: 'invalid input 333'})
    }else{
        res.status(500).json({message: 'oops thats on us'})
    }
})


export default app