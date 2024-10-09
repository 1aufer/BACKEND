const jwt = require("jsonwebtoken");

const permissionMiddleware = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Usuário não autenticado." });
    }
    
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Acesso negado." });
    }

    next();
  };
};

module.exports = permissionMiddleware;
