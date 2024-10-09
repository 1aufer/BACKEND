const jwt = require("jsonwebtoken");
const user = require('../controller/user')

function authMiddleware(roles = []) {
  return (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(400).json({ mensagem: "Token não fornecido" });
    }

    jwt.verify(token, "exemplo", async (err, decoded) => {
      if (err) {
        return res.status(401).json({ mensagem: "Token inválido" });
      }

      try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        
        req.user = decoded; 
        next(); 
      } catch (error) {
        res.status(401).json({ message: 'Token inválido ou expirado.' });
      }
      const userLogged = await user.findUser(decoded.id)

      if(!userLogged) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }
      if(roles.length && !roles.includes(userLogged.permissao)){
        return res.status(403).json({ mensagem: "Sem permissão" });
      }

      req.session = decoded;

      next();
    });
  }
}

module.exports = authMiddleware;
