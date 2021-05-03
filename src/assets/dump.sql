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
    balance FLOAT,
    date DATE
);
