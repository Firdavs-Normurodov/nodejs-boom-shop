import jwt from "jsonwebtoken";
const generateJWToken = (userId) => {
  const accesToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  return accesToken;
};
export { generateJWToken };
