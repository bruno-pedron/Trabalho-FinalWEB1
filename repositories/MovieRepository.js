const db = require('../models/ConnectDatabase');

class MovieRepository {
    // Método para buscar todos os filmes com informações do gênero
        async findAll() {
            const [rows] = await db.query(`
                SELECT
                    filmes.idf,
                    filmes.tit AS Título,
                    genero.nome AS Gênero,
                    filmes.ano_lanc AS 'Ano de Lançamento',
                    filmes.aval AS Avaliação
                FROM 
                    filmes
                JOIN 
                    genero ON filmes.gen = genero.idG;
            `);
            return rows;
        }    

    // Método para buscar um filme específico por ID
    async findById(id) {
        const row = await db.query(`
            SELECT
                filmes.idf,
                filmes.tit AS Título,
                genero.nome AS Gênero,
                filmes.ano_lanc AS 'Ano de Lançamento',
                filmes.aval AS Avaliação
            FROM 
                filmes
            JOIN 
                genero ON filmes.gen = genero.idG
            WHERE filmes.idF = ?;
        `, [id]);
        return row[0];
    }

    // Método para adicionar um novo filme
    async create(tit, gen, ano_lanc, aval) {
        await db.query(`
            INSERT INTO filmes (tit, gen, ano_lanc, aval) 
            VALUES (?, ?, ?, ?);
        `, [tit, gen, ano_lanc, aval]);
    }

    // Método para atualizar informações de um filme
    async update(id, tit, gen, ano_lanc, aval) {
        const result = await db.query(`
            UPDATE filmes
            SET tit = ?, gen = ?, ano_lanc = ?, aval = ?
            WHERE idF = ?;
        `, [tit, gen, ano_lanc, aval, id]);

        return result;
    }

    // Método para deletar um filme
    // Em MovieRepository.js
    async delete(id) {
        const result = await db.query(`
            DELETE FROM filmes WHERE idF = ?;
        `, [id]);

        return result; // Retorna o resultado da consulta de deleção
    }

}

module.exports = new MovieRepository();