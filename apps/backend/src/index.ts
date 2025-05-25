import express from 'express';
import cors from 'cors';
import { prisma } from '@repo/db';
import authRoutes from "./routes/auth.routes"
import cookieParser from  "cookie-parser"
const app=express();

app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use("/api/v1/auth",authRoutes);


const client = prisma.user.findFirst({
    where:{
        id:"56"
    }
})


const port = process.env.PORT || 3001;

app.listen(port,()=>{
    console.log(`app is listening on port `+port);
})
