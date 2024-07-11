const express = require('express');
const sequelize = require('../../database/database');
const Transacao = require('../model/transacao/modelTransacao');
const CategoriaTransacao = require('../model/categoriaTransacao/modelCategoriaTransacao');

const router = express.Router();

router.post('/', async (req, res) => {
  let transaction;
  try {
    const userId = req.userId;

    // Iniciar uma transação
    transaction = await sequelize.transaction();
    
    // Criar a transação
    const transacaoData = { ...req.body.transacao, idUsuario: userId };
    const transacao = await Transacao.create(transacaoData, { transaction });

    // Criar as categorias de transação
    const categorias = req.body.categorias.map(categoria => {
      return {
        valor: categoria.valor,
        idTransacao: transacao.id,
        idCategoria: categoria.idCategoria
      };
    });

    await CategoriaTransacao.bulkCreate(categorias, {
      fields: ['idTransacao', 'idCategoria', 'valor', 'createdAt', 'updatedAt'],
      transaction
    });

    // Commit da transação se tudo ocorrer bem
    await transaction.commit();

    res.status(201).json({ transacao, categorias });
  } catch (error) {
    // Rollback da transação em caso de erro
    if (transaction) {
      await transaction.rollback();
    }
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.put('/:id', async (req, res) => {
  let transaction;
  try {
    const userId = req.userId; // ID do usuário autenticado
    const transacaoId = req.params.id;
    const transacaoData = req.body;
    
    // Iniciar uma transação
    transaction = await sequelize.transaction();

    // Verificar se a transação pertence ao usuário autenticado
    const transacao = await Transacao.findOne({ where: { id: transacaoId, idUsuario: userId } });
    if (!transacao) {
      await transaction.rollback();
      return res.status(403).json({ message: 'Você só pode editar suas próprias transações' });
    }

    // Atualizar os dados da transação
    await transacao.update(transacaoData.transacao, { where: { id: transacaoId, idUsuario: userId }, transaction });

    // Verificar se existem categorias de transação a serem excluídas
    if (transacaoData.categorias) {
      const categoriasEnviadas = transacaoData.categorias.map(categoria => categoria.idCategoria);

      // Encontrar categorias de transação associadas à transação
      const categoriasExistentes = await CategoriaTransacao.findAll({ where: { idTransacao: transacaoId } });
      
      console.log("Chegou aqui")

      const categoriasParaAtualizarOuCriar = transacaoData.categorias;
      const categoriasParaExcluir = categoriasExistentes.filter(categoria => !categoriasEnviadas.includes(categoria.idCategoria));

      // Excluir as categorias de transação não presentes no objeto enviado
      await Promise.all(categoriasParaExcluir.map(categoria => categoria.destroy({ transaction })));

      // Atualizar ou criar categorias de transação enviadas
      for (const categoriaEnviada of categoriasParaAtualizarOuCriar) {
        const categoriaExistente = categoriasExistentes.find(categoria => categoria.idCategoria === categoriaEnviada.idCategoria);
        if (categoriaExistente) {
          // Atualizar categoria existente
          await categoriaExistente.update(categoriaEnviada, { where: { idCategoria: categoriaExistente.idCategoria, idTransacao: transacaoId, idUsuario: userId }, transaction });
        } else {
          // Criar nova categoria
          await CategoriaTransacao.create({
            idTransacao: transacaoId,
            idCategoria: categoriaEnviada.idCategoria,
            valor: categoriaEnviada.valor
          }, { transaction });
        }
      }
    }

    console.log("Chegou aqui 2")

    // Commit da transação se tudo ocorrer bem
    await transaction.commit();

    res.status(204).json(transacaoData);
  } catch (error) {
    console.error(error);
    // Rollback da transação em caso de erro
    if (transaction) {
      await transaction.rollback();
    }
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Exclusão de transação
router.delete('/:id', async (req, res) => {
  try {
    const { id: userId } = req.userId; // ID do usuário autenticado
    const { id: transacaoId } = req.params;

    // Verificar se a transação pertence ao usuário
    const transacao = await Transacao.findOne({ where: { id: transacaoId, idUsuario: userId } });
    if (!transacao) {
      return res.status(403).json({ message: 'Você só pode excluir suas próprias transações' });
    }

    // Excluir a transação e as categorias de transação associadas
    await CategoriaTransacao.destroy({ where: { idTransacao: transacaoId } });
    await Transacao.destroy({ where: { id: transacaoId } });

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = req.userId; // Obtém o ID do usuário autenticado
    
    const transacoes = await Transacao.findAll({ where: { idUsuario: userId } });
    res.json(transacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
