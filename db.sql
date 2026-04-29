-- =========================
-- TABELA: usuarios
-- =========================
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    nick VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABELA: posts
-- =========================
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    conteudo TEXT NOT NULL,
    autor_id INT NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_post_autor
        FOREIGN KEY (autor_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

-- =========================
-- TABELA: likes
-- =========================
CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    autor_id INT NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_like_post
        FOREIGN KEY (post_id)
        REFERENCES posts(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_like_autor
        FOREIGN KEY (autor_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,

    -- evita likes duplicados
    CONSTRAINT unique_like UNIQUE (post_id, autor_id)
);

-- =========================
-- ÍNDICES (performance)
-- =========================

CREATE INDEX IF NOT EXISTS idx_posts_autor
    ON posts (autor_id);

CREATE INDEX IF NOT EXISTS idx_likes_post
    ON likes (post_id);

CREATE INDEX IF NOT EXISTS idx_likes_autor
    ON likes (autor_id);