import jwt from "jsonwebtoken";
import "dotenv/config";

export const handleVerifyToken = (token) => {
  if (token) {
    if (token) {
      return jwt.verify(
        token,
        process.env.AccessToken,
        function (err, decoded) {
          if (decoded) {
            return decoded.data;
          }
        }
      );
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
