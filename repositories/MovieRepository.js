const db = require('../models/ConnectDatabase');

class MovieRepository {
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

    async create(tit, gen, ano_lanc, aval) {
        await db.query(`
            INSERT INTO filmes (tit, gen, ano_lanc, aval) 
            VALUES (?, ?, ?, ?);
        `, [tit, gen, ano_lanc, aval]);
    }    

    async update(id, tit, gen, ano_lanc, aval) {
        const result = await db.query(`
            UPDATE filmes
            SET tit = ?, gen = ?, ano_lanc = ?, aval = ?
            WHERE idF = ?;
        `, [tit, gen, ano_lanc, aval, id]);

        return result;
    }

    async delete(id) {
        const result = await db.query(`
            DELETE FROM filmes WHERE idF = ?;
        `, [id]);

        return result;
    }

}

module.exports = new MovieRepository();