CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    mail VARCHAR(60) UNIQUE,
    password VARCHAR(200) UNIQUE,
    refresh_token VARCHAR(200) DEFAULT '',
    access_token VARCHAR(200) DEFAULT '',
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- DROP TABLE users;
DROP TABLE operations;

CREATE TABLE operations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),

    file_name VARCHAR(100),
    bank VARCHAR(100),
    pdf VARCHAR(100),
    xlsx VARCHAR(100),
    comma_separated_values VARCHAR(100),
    xml_tally VARCHAR(100),

    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);