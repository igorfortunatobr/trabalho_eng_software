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

const formatDateTime =  function (_DATA) {
  const date = new Date(_DATA);
  date.setHours(date.getHours() + 3);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  console.log(`${day}/${month}/${year} ${hours}:${minutes}:${seconds}`)

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
    handleSequelizeError,
    formatDateTime
};