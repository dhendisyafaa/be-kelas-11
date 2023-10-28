import Users from "../models/users.js";

export class UserController{
    async get(_, res){
            try {
                const users = await Users.findAll();
                return res.json(users);
            } catch (error) {
                return console.log(error);
            }
        
    }
}