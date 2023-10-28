import express from "express";

import { UserController } from "../controllers/users.js";

const router = express.Router();

router.get('/', new UserController().get);

export const userRoutes=router;