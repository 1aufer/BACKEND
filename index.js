const express = require('express');
const sequelize = require('./src/config/database'); 
const UserRouter = require('./src/routes/user'); 
const PiadaRouter = require('./src/routes/piada'); 

const app = express();
app.use(express.json());

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/piada', PiadaRouter);

sequelize.sync({ force: false }) 
  .then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar o banco de dados:', err);
  });
