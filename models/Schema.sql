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
('De Volta para o Futuro', 4, 1985, 5);