
const Piada = require('../models/Piada'); 
const axios = require('axios');

const criarPiada = async (req, res) => {
  try {
    const { data } = await axios.get('https://v2.jokeapi.dev/joke/Any');
    
    const novaPiada = await Piada.create({
      categoria: data.category,
      tipo: data.type,
      piada: data.joke || data.setup,
      resposta: data.delivery || null,
    });
    
    res.status(201).json(novaPiada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar piada', error });
  }
};

const listarPiadas = async (req, res) => {
  try {
    const piadas = await Piada.findAll(); 
    res.status(200).json(piadas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar piadas', error });
  }
};

module.exports = { criarPiada, listarPiadas };
