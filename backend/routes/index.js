import  express  from "express";
import { Login, Logout, Register, getUsers } from "../controllers/Users.js"
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.post('/users', Register);
router.get('/users', verifyToken ,getUsers);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;