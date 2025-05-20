import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { connectDb } from "./config/dbConfig.js";
import { sequelize } from './config/dbConfig.js';
import { authRouter } from './routes/authRoute.js';
import { userRouter } from './routes/userRoutes.js';

const app = express();
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use('/api',authRouter,userRouter)

app.listen(3000,()=>{
    console.log("Server UP")
    connectDb()
    // sequelize.sync({alter:true}).then(()=>console.log("db synced")) //Sync Models
});



