import express from "express";
import {

  getAllUsers,
  loginUser,

  registerUser,
  verifyAccount,
} from "../controllers/userController.js";

import { refreshToken } from "../controllers/refreshToken.js";

const router = express.Router();

router.get("/api/token",refreshToken)

router.post("/api/register", registerUser);
router.get("/api/verify_account/:token", verifyAccount);
router.post("/api/login", loginUser);


router.get("/api/users", getAllUsers);

export default router;
