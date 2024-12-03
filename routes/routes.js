const express = require("express");
const router = express.Router();
const path = require("path");
const MovieController = require("../controllers/MovieController");

// Rotas para páginas HTML
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/html/index.html"));
});

router.get("/cadastrar", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/html/CadFilme.html"));
});

router.get("/filmes", (req, res) => {
    res.sendFile(path.join(__dirname, "../src/html/Filmes.html"));
});

// Rotas da API
router.post("/filmes", MovieController.store);
router.get("/api/filmes", MovieController.index);
router.put("/filmes/:id", MovieController.update);
router.delete("/filmes/:id", MovieController.delete);

module.exports = router;