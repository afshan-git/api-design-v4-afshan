 import prisma from '../db'
import { createJWT, hashPassword, comparePasswords } from '../modules/auth'

 export const createNewUser = async (req,res,next) => {
    //we need two try catches for 2 different async functions
    try{
        console.log("hola")
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password) 
            }
        })
        console.log("hola")
        const token = createJWT(user)
        console.log("amigos")
        res.json({token})
    }catch(e){
        e.type = 'input'
        next(e)
    }
    
    
  
 }

 export  const signin = async (req,res) => {
    const user = await prisma.user.findUnique({
        where:{
            username: req.body.username
        }
    })

    const isValid = await comparePasswords(req.body.password,user.password)
    if( !isValid){
        res.status(401)
        res.json({message:"nope"})
        return
    }
    const token = createJWT(user)
    res.json({token}) 
 }