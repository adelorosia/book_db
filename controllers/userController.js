import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

import { jwtDecode } from "jwt-decode";
import { sendVerificationEmail } from "./sendEmail.js";

//Register
export const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new Error("Email Address is already in our database existed");
  }

  await User.create({ firstName, lastName, email, password });
  const verifyAccountToken = jwt.sign(
    {
      email,
    },
    process.env.VERIFY_ACCOUNT_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );
  res.cookie("verify_account", verifyAccountToken, {
    httpOnly: true,
    maxAge: 2 * 60 * 1000,
    secure: true,
  });

  await sendVerificationEmail(email, verifyAccountToken);
  res.json({ message: "You are successful registred ", verifyAccountToken });
});

//VerifyAccount
export const verifyAccount = asyncHandler(async (req, res) => {
  try {
    const token = req.cookies.verify_account;
    if (!token) throw new Error("not token");
    const decode = jwtDecode(token);
    const email = decode.email;
    const user = await User.findOne({ email });
    if (!user) throw new Error("not user");
    user.verification_account = true;
    await user.save();
    res.json("verify success");
  } catch (error) {
    res.json(error);
  }
});

//Login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser && (await foundUser.isPasswordMatched(password))) {
    if (foundUser.verification_account) {
      const {
        _id: userId,
        firstName,
        lastName,
        email,
        photo,
        isAdmin,
      } = foundUser;
      const accessToken = jwt.sign(
        {
          userId,
          firstName,
          lastName,
          email,
          photo,
          isAdmin,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );
      const refreshToken = jwt.sign(
        {
          userId,
          firstName,
          lastName,
          email,
          photo,
          isAdmin,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "30s",
        }
      );

      await User.findByIdAndUpdate(userId, { access_token: accessToken });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      const userInfo_access = jwtDecode(accessToken);
      const userInfo_refresh = jwtDecode(refreshToken);

      res.json({
        accessToken,
        userInfo_access,
        userInfo_refresh,
        refreshToken,
        message: "Sie haben erfolgreich login",
      });
    } else {
      const verifyAccountToken = jwt.sign(
        {
          email,
        },
        process.env.VERIFY_ACCOUNT_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );
      res.cookie("verify_account", verifyAccountToken, {
        httpOnly: true,
        maxAge: 2 * 60 * 1000,
        secure: true,
      });

      await sendVerificationEmail(email, verifyAccountToken);

      throw new Error(
        "Sie mussen Ihre Account Verification, wir haben eine Link für Sie geschikt"
      );
    }
  } else {
    throw new Error("Email or Password is falsh");
  }
});

//Logout
export const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) throw new Error("keine Token verfügbar");
  const user = await User.findOne({ access_token: token });
  if (!user) throw new Error("Keine user gefunden");
  user.access_token = undefined;
  await user.save();
  res.clearCookie("accessToken");
  res.json("logout successfull");
});

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});
