import jwt from "jsonwebtoken";
import "dotenv/config";

export const handleGenerateToken = (token) => {
  return jwt.sign(
    {
      data: token,
    },
    process.env.AccessToken || "",
    { expiresIn: "60m" }
  );
};
