const express = require("express");
const routes = require("./routes/routes");
const path = require("path");
const app = express();
const PORT = 3000;

// Middleware para JSON
app.use(express.json());

// Servir arquivos estáticos do diretório correto
app.use(express.static(path.join(__dirname, "src")));

// Rotas
app.use(routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});