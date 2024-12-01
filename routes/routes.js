const { Router } = require('express');
const MovieController = require('../controllers/MovieController');  // Caminho correto

const routes = Router();

routes.get('/filmes', MovieController.index);
routes.get('/filmes/:id', MovieController.show);
routes.post('/filmes', MovieController.store);
routes.put('/filmes/:id', MovieController.update);
routes.delete('/filmes/:id', MovieController.delete);

module.exports = routes;