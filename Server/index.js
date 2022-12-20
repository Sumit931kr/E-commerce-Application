import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import dotenv from 'dotenv';
import itemRoutes from './routes/itemRoutes.js'
import auth from './routes/auth.js';

dotenv.config();

const MongoURI = process.env.MONGOURI
// console.log(MongoURI);
const port = 5000 || process.env.PORT
const app = express();
app.use(cors());
app.use(express.json());


app.use('/api',itemRoutes)
app.use('/auth',auth)
app.use('/',(req,res)=>{
    res.json("Server is Running at '/' ")
})


mongoose.connect(MongoURI, ()=>{
    console.log("Connected to database sucessfully")
})


app.listen(port, ()=>{
    console.log(`Server is running at ${port}`)
})




