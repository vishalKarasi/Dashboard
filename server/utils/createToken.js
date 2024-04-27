import jwt from "jsonwebtoken";

export function createToken(type, id) {
  return jwt.sign(
    { id },
    type === "accessToken"
      ? process.env.ACCESS_TOKEN_SECRET
      : process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:
        type === "accessToken"
          ? process.env.ACCESS_TOKEN_EXPIRATION_TIME
          : process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    }
  );
}
