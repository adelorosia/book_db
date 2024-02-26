import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) throw new Error("Sie mussen zuerst einloggen");
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) throw new Error("Token abgelaufen");
    req.userId = decoded.userId;
    next();
  });
};
