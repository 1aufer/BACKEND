const axios = require('axios');
const Piada = require('../model/Piada');

const fetchAndSaveJoke = async (req, res) => {
  try {
    const { data } = await axios.get('https://v2.jokeapi.dev/joke/Any');
    
    const piada = {
      categoria: data.category,
      tipo: data.type,
      piada: data.joke || data.setup,
      resposta: data.delivery || null,
    };

    const novaPiada = await Piada.create(piada);

    res.status(201).json(novaPiada);
  } catch (error) {
    console.error('Erro ao buscar piada:', error);
    res.status(500).json({ message: 'Erro ao buscar piada', error });
  }
};

const getJokes = async (req, res) => {
  try {
    const piadas = await Piada.findAll();
    res.status(200).json(piadas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar piadas', error });
  }
};

const updateJoke = async (req, res) => {
  const { id } = req.params;
  const { categoria, tipo, piada, resposta } = req.body;

  try {
    const joke = await Piada.findByPk(id);

    if (!joke) {
      return res.status(404).json({ message: 'Piada não encontrada' });
    }

    joke.categoria = categoria || joke.categoria;
    joke.tipo = tipo || joke.tipo;
    joke.piada = piada || joke.piada;
    joke.resposta = resposta || joke.resposta;

    await joke.save();
    res.status(200).json(joke);
  } catch (error) {
    console.error('Erro ao atualizar piada:', error);
    res.status(500).json({ message: 'Erro ao atualizar piada', error });
  }
};

const deleteJoke = async (req, res) => {
  const { id } = req.params;

  try {
    const joke = await Piada.findByPk(id);

    if (!joke) {
      return res.status(404).json({ message: 'Piada não encontrada' });
    }

    await joke.destroy();
    res.status(200).json({ message: 'Piada deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar piada:', error);
    res.status(500).json({ message: 'Erro ao deletar piada', error });
  }
};

module.exports = { fetchAndSaveJoke, getJokes, updateJoke, deleteJoke };
