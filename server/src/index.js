import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fs from 'fs'
import 'dotenv/config'
import { connectDb } from "./config/dbConfig.js";
import swaggerUi from 'swagger-ui-express'
import { authRouter } from './routes/authRoute.js';
import { userRouter } from './routes/userRoutes.js';
import { sequelize } from './config/dbConfig.js';


const app = express();
app.use(cookieParser());
app.use(cors({origin:["http://localhost:3000","http://localhost:5173"],credentials:true})) //cors

//swagger documentatin using Annotations
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 

//swagger documentation using json
const swaggerDocument = JSON.parse(fs.readFileSync('./src/swaggerDoc/openapi.json','utf-8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//json middleware
app.use(express.json());

//Routes
app.use('/api',authRouter,userRouter);

app.listen(3000,()=>{
    console.log("Server UP")
    connectDb()
    // sequelize.sync({force:true}).then(()=>console.log("DB Synced"))      //Sync Models
});



