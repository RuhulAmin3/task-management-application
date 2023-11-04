import jwt, { Secret } from "jsonwebtoken";

const createToken = (
  payload: Record<string, any>,
  secret: Secret,
  expireTime: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn: expireTime });

  return token;
};

export const jwtHelper = {
  createToken,
};
