import merge from 'lodash.merge'

process.env.NODE_ENV = process.env.NODE_ENV || "development";
//defaultly development if nothing else
//stage =local ; env=production
const stage = process.env.STAGE || 'local'

let envConfig
if(stage==='production'){
    envConfig = require('./prod').default //->default if for a interop between ES6 module and non ES6 module
}else if(stage === 'testing'){
    envConfig = require('./testing').default
}else{
    envConfig = require('./local').default
}

export default merge({
    stage,
    env: process.env.NODE_ENV,
    port: 3001,
    secrets: {
        jwt: process.env.JWT_SECRET,
        dbUrl:  process.env.DATABASE_URL
    }
},envConfig)
