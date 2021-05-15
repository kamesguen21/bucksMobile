CREATE TABLE IF NOT EXISTS user(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    balance FLOAT,
    earned FLOAT,
    spent FLOAT,
    email TEXT
);
CREATE TABLE IF NOT EXISTS entry(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    type TEXT,
    amount FLOAT,
    date DATE,
    categoryId INTEGER
);
CREATE TABLE IF NOT EXISTS category(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    color TEXT,
    updatedAt DATE,
    createdAt DATE
);
INSERT or IGNORE INTO category(id, name, color) VALUES (1, 'Main Category', '#3382FF');
