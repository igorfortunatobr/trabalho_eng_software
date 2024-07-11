const { ValidationError, ForeignKeyConstraintError } = require('sequelize');

const handleSequelizeError = (error, res) => {
    console.error(error);
  
    if (error instanceof ForeignKeyConstraintError) {
      return res.status(400).json({ message: 'Erro de chave estrangeira. Verifique as dependências.' });
    } else if (error instanceof ValidationError) {
      return res.status(400).json({ message: 'Erro de validação. Verifique os dados enviados.' });
    } else {
      return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
  };

module.exports = {
    handleSequelizeError
};