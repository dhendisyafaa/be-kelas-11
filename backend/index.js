import fileUpload from "express-fileupload";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./config/Database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
// import Users from "./models/UserModel.js";
dotenv.config(); 
const app = express();
app.use(express.json());
app.use(fileUpload());

try{
    await db.authenticate();
    console.log('Database connected ...');
    // await Users.sync();
} catch (error) {
    console.error(error);
}

app.use(cors({ credentials:true, origin:'http://localhost:3000'}));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, ()=> console.log('server jalan di port 5000 / server running at port 500'));