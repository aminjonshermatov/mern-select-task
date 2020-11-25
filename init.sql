ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass';

flush privileges;

CREATE DATABASE socialexpress CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE socialexpress.posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    author_avatar TEXT NOT NULL,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    photo_url TEXT NOT NULL,
    photo_alt TEXT NOT NULL,
    hit BOOL NOT NULL DEFAULT FALSE,
    likes INT NOT NULL DEFAULT 0,
    likedByMe BOOL NOT NULL DEFAULT FALSE,
    hidden BOOL NOT NULL DEFAULT FALSE,
    tags TEXT NOT NULL,
    removed BOOL NOT NULL DEFAULT FALSE,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
