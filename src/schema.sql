-- schema.sql

CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    role TEXT NOT NULL DEFAULT 'viewer',
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS ablums (
    album_id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    cover_image_id TEXT,
    created_by TEXT REFERENCES users(user_id),
    created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS image_id (
    image_id TEXT PRIMARY KEY,
    album_id TEXT REFERENCES albums(album_id),
    uploaded_by TEXT REFERENCES users(user_id),
    filename TEXT NOT NULL,
    width INTEGER,
    height INTEGER,
    file_size INTEGER,
    taken_at TEXT,
    created_at TEXT DEFAULT (datetime('now'))
);

