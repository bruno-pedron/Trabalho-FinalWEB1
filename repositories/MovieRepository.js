const db = require('../models/ConnectDatabase');

class MovieRepository {
    async findAll() {
        const { rows } = await db.query(`
            SELECT
                filmes.idf,
                filmes.tit AS "Título",
                genero.nome AS "Gênero",
                filmes.ano_lanc AS "Ano de Lançamento",
                filmes.aval AS "Avaliação"
            FROM 
                filmes
            JOIN 
                genero ON filmes.gen = genero.idg;
        `);
        return rows;
    }    

    async findById(id) {
        const { rows } = await db.query(`
            SELECT
                filmes.idf,
                filmes.tit AS "Título",
                genero.nome AS "Gênero",
                filmes.ano_lanc AS "Ano de Lançamento",
                filmes.aval AS "Avaliação"
            FROM 
                filmes
            JOIN 
                genero ON filmes.gen = genero.idg
            WHERE filmes.idf = $1;
        `, [id]);
        return rows[0];
    }

    async create(tit, gen, ano_lanc, aval) {
        await db.query(`
            INSERT INTO filmes (tit, gen, ano_lanc, aval) 
            VALUES ($1, $2, $3, $4);
        `, [tit, gen, ano_lanc, aval]);
    }    

    async update(id, tit, gen, ano_lanc, aval) {
        const result = await db.query(`
            UPDATE filmes
            SET tit = $1, gen = $2, ano_lanc = $3, aval = $4
            WHERE idf = $5;
        `, [tit, gen, ano_lanc, aval, id]);

        return result;
    }

    async delete(id) {
        const result = await db.query(`
            DELETE FROM filmes WHERE idf = $1;
        `, [id]);

        return result;
    }
}

module.exports = new MovieRepository();