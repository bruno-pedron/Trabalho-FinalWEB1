// server.js
const express = require('express');
const routes = require('./routes/routes'); // Importando as rotas
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json()); // Para poder lidar com requisições em JSON

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'src')));

// Usar as rotas
app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

