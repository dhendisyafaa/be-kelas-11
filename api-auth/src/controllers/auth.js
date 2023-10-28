import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Users from "../models/users.js";

export class AuthController{
    async login(req, res){
        try {
            const user = await Users.findAll({
                where: {
                    email: req.body.email
                }
            });
            const match = await bcrypt.compare(req.body.pass, user[0].pass);
            if(!match) return res.status(400).json({msg: "Incorrect Password"});
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '5m'
            });
            const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET,{
                expiresIn: '1d'
            });
            await Users.update({ refresh_token : refreshToken },{
                where: {
                    id: userId
                }
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });
            res.json({ accessToken });
        } catch (error) {
            res.status(404).json({msg: "Email not found"})
        }
    }

    async register(req, res){
        const { name, email, pass, confPass } = req.body;
        if (pass !== confPass) return res.status(400).json({msg: "password and confirm password do not match"});
        const salt = await bcrypt.genSalt();
        const hashPass = await bcrypt.hash(pass, salt);
        try {
            await Users.create({
                name: name,
                email: email,
                pass: hashPass,
            });
            res.json({msg: "registration was successful"});
        } catch (error) {
            console.log(error);
        }
    }
}