import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) throw new Error("not token");
  const user = await User.findOne({ access_token: token });
  if (user) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) throw new Error("gibt es ein Problem");
      const { _id: userId, firstName, lastName, email, photo, isAdmin } = user;
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
      res.json({ refreshToken });
    });
  } else res.json("user not found");
});
