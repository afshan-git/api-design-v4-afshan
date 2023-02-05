setTimeout(() =>{
    throw new Error('oops')
},300)

//an object that represent the process which you are in currently
process.on('uncaughtException',()=>{

})

//async error
process.on('unhandledRejection', () =>{
    
})