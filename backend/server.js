import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import './Models/db.js';
import quizRoutes from './Routes/quizRoutes.js';
import responseRoutes from './Routes/responseRoutes.js';
import authRoutes from './Routes/authRoutes.js'
dotenv.config();

const app = express()
const port = process.env.PORT || 8080

app.use(cors());
app.use(express.json());
app.use("/api/quiz", quizRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/auth",authRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log(`Server connected`)
})