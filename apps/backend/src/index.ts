import express from 'express';
import cors from 'cors';
import { prisma } from '@repo/db';
import authRoutes from "./routes/auth.routes"
import roomRoutes from "./routes/room.routes"
import cookieParser from  "cookie-parser"
const app=express();

app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/room",roomRoutes)




const port = process.env.PORT || 3001;

app.listen(port,()=>{
    console.log(`app is listening on port `+port);
})
