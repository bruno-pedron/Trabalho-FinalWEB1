CREATE TABLE genero (
    idG INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL
);

CREATE TABLE filmes (
    idF INT AUTO_INCREMENT PRIMARY KEY,
    tit VARCHAR(255) NOT NULL,
    gen INT,
    ano_lanc INT,
    aval INT,
    FOREIGN KEY (gen) REFERENCES genero(idG)
);

INSERT INTO genero (nome) VALUES 
('Ação'),
('Comédia'),
('Drama'),
('Ficção Científica'),
('Terror'),
('Animação'),
('Romance'),
('Aventura');

INSERT INTO filmes (tit, gen, ano_lanc, aval) VALUES 
('O Poderoso Chefão', 3, 1972, 5),
('Vingadores: Ultimato', 1, 2019, 5),
('De Volta para o Futuro', 4, 1985, 5),
('Forrest Gump', 3, 1994, 5),
('Corra!', 5, 2017, 4),
('Se Beber, Não Case!', 2, 2009, 4),
('A Origem', 4, 2010, 5),
('It: A Coisa', 5, 2017, 3),
('Coringa', 3, 2019, 5),
('Gladiador', 1, 2000, 4),
('O Rei Leão', 6, 1994, 5),
('Titanic', 7, 1997, 5),
('Indiana Jones', 8, 1981, 4);        
