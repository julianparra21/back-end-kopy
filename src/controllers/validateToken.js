import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("entra");
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      message: "No se proporcionó un token de autenticación",
    });
  }

  jwt.verify(token, process.env.SECRET || "TokenGenerate", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "El token de autenticación es inválido",
      });
    }
    console.log(decoded);

    req.userId = { id: decoded.email };
    next();
  });
};
