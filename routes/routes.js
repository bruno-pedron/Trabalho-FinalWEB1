const { Router } = require('express');
const ContactController = require('../controllers/ContactController');  // Caminho correto

const routes = Router();

routes.get('/filmes', ContactController.index);
routes.get('/filmes/:id', ContactController.show);
routes.post('/filmes', ContactController.store);
routes.put('/filmes/:id', ContactController.update);
routes.delete('/filmes/:id', ContactController.delete);

module.exports = routes;