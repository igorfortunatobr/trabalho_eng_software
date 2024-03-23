const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/keys');

function verificarToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: 'Token de autenticação não fornecido' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Falha na autenticação do token' });
    }

    req.userId = decoded.id;
    next();
  });
}

module.exports = { verificarToken };
