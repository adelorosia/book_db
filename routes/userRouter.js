import express from "express";
import {
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
  verifyAccount,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/token/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";

const router = express.Router();

router.get("/api/token",refreshToken)

router.post("/api/register", registerUser);
router.get("/api/verify_account/:token", verifyAccount);
router.post("/api/login", loginUser);
router.delete("/api/logout", logoutUser);

router.get("/api/users", getAllUsers);

export default router;
