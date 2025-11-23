//jwt.js
// src/utils/jwt.js

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    JWT_SECRET,
    {
      expiresIn: "7d" 
    }
  );
};
