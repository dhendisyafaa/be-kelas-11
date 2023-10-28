import express from "express";
import db from "./src/config/Database.js";
import { authRoutes } from "./src/routes/auth.js";
import dotenv from "dotenv";
import { userRoutes } from "./src/routes/users.js";

dotenv.config();
// import Users from "./src/models/UserModel.js";
const app = express();

try {
    await db.authenticate();
    console.log('DB Connected');
    // await db.sync();
} catch (error) {
    console.error(error); 
}

app.use(express.json());

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(5000, ()=> console.log('Server running at port 5000')); 