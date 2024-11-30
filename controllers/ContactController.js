// controllers/ContactController.js
const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
    async index(req, res) {
        try {
            const filmes = await ContactRepository.findAll();
            res.json(filmes);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao recuperar filmes' });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const filme = await ContactRepository.findById(id);
            if (filme) {
                res.json(filme);
            } else {
                res.status(404).json({ message: 'Filme não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao recuperar filme' });
        }
    }

        async store(req, res) {
            const { tit, gen, ano_lanc, aval } = req.body;
    
            if (!tit || !gen || !ano_lanc || !aval) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }
    
            try {
                await ContactRepository.create(tit, gen, ano_lanc, aval);
                res.status(201).json({ message: 'Filme adicionado com sucesso.' });
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao adicionar filme.' });
            }
        }
    

        async update(req, res) {
            const { id } = req.params;  // Pega o ID do filme da URL
            const { tit, gen, ano_lanc, aval } = req.body; // Pega os dados do corpo da requisição
    
            // Verifica se todos os campos necessários foram fornecidos
            if (!tit || !gen || !ano_lanc || !aval) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }
    
            try {
                // Chama o método no repositório para atualizar o filme
                const result = await ContactRepository.update(id, tit, gen, ano_lanc, aval);
    
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Filme não encontrado.' });
                }
    
                // Retorna sucesso se o filme foi atualizado
                res.status(200).json({ message: 'Filme atualizado com sucesso.' });
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao atualizar filme.' });
            }
        }

        async delete(req, res) {
            const { id } = req.params; // Pega o ID do filme da URL
    
            try {
                // Chama o método no repositório para deletar o filme
                const result = await ContactRepository.delete(id);
    
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Filme não encontrado.' });
                }
    
                // Retorna sucesso se o filme foi deletado
                res.status(200).json({ message: 'Filme deletado com sucesso.' });
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Erro ao deletar filme.' });
            }
        }
}

module.exports = new ContactController();