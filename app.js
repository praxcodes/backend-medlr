const express= require('express');

const medicines=require('./routes/medicines');
const connectDB= require('./db/connect');
require('dotenv').config();
const notFound=require('./middleware/not-found')
const redis= require('redis')
const {initialiseRedisClient}= require("./middleware/redis")

//middleware
async function initialiseExpress(){
    const app=express();
    app.use(express.json())

    await initialiseRedisClient();
    app.use('/api/v1/medicines', medicines);
    app.use(notFound)//handles not-found 404 error
    const port=process.env.port || 3000;

//connecting to db
const start=async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port,()=>
            console.log(`Server is listening on port ${port}...`)
        )
        
    } catch (error) {
        console.log(error);
    }
};
start();
}

initialiseExpress()
.then()
.catch((e)=>console.log(e))



