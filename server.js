const mysql = require('mysql');
const express = require('express');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'pass',
    database : 'socialexpress'
});

connection.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        process.exit(1);
    }

    console.log('MySQL connected as id ' + connection.threadId);
});

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

    next();
}

app.get('/api/posts.get', allowCrossDomain, async (req, res) => {
    connection.query(`SELECT id, author_avatar, author_name, content, photo_url, photo_alt, hit, likes, likedByMe, hidden, tags, created
                        FROM posts
                        WHERE removed = FALSE`, (error, results) => {
        if (error) {
            res.type('application/json');
            res.status(400).json({ error });
            return;
        };
        res.type('application/json')
        res.status(200).json({ results });
    });
});

app.post('/api/posts.getbyId', allowCrossDomain, async (req, res) => {
    const { id } = req.body;

    if (!id || id < 0 || isNaN(id)) {
        res.type('application/json');
        res.status(400).json(req.body);
        return;
    }
    
    connection.query(`SELECT id, author_avatar, author_name, content, photo_url, photo_alt, hit, likes, likedByMe, hidden, tags, created
                        FROM posts
                        WHERE id = ${id}`, (error, results) => {
        if (error) {
            res.type('application/json');
            res.status(400).json({ error });
            return;
        };
        const [result] = results;
        res.type('application/json')
        res.status(200).json(result);
    });
});

app.post('/api/posts.addPost', allowCrossDomain, async (req, res) => {    
    connection.query(`INSERT INTO posts (
                                        author_avatar,
                                        author_name,
                                        content,
                                        photo_url,
                                        photo_alt,
                                        hit,
                                        likes,
                                        likedByMe,
                                        hidden,
                                        tags
                                    ) VALUES(
                                        "${req.body.author_avatar}",
                                        "${req.body.author_name}",
                                        "${req.body.content}",
                                        "${req.body.photo_url}",
                                        "${req.body.photo_alt}",
                                        ${req.body.hit},
                                        ${req.body.likes},
                                        ${req.body.likedByMe},
                                        ${req.body.hidden},
                                        "${req.body.tags}"
                                    );`, (error, results) => {
        if (error) {
            res.type('application/json');
            res.status(400).json({ error });
            return;
        };
        res.type('application/json')
        res.status(200).json(results.insertId);
    });
});

app.post('/api/posts.edit', allowCrossDomain, async (req, res) => {
    connection.query(`UPDATE
                            posts
                        SET 
                            content="${req.body.content}",
                            photo_url="${req.body.photo_url}",
                            photo_alt="${req.body.photo_alt}",
                            hit=${req.body.hit},
                            hidden=${req.body.hidden},
                            tags="${req.body.tags}"
                        WHERE
                            id=${req.body.id};`, (error, results) => {
        if (error) {
            res.type('application/json');
            res.status(400).json({ error });
            return;
        };
        res.type('application/json')
        res.status(204).json(results.affectedRows);
    });
});

app.post('/api/posts.delete', allowCrossDomain, async (req, res) => {
    connection.query(`UPDATE posts SET  removed=true WHERE id=${req.body.id};`, (error, results) => {
        if (error) {
            res.type('application/json');
            res.status(400).json({ error });
            return;
        };
        res.type('application/json')
        res.status(204).json(results.affectedRows);
    });
});

app.post('/api/posts.restore', allowCrossDomain, async (req, res) => {
    connection.query(`UPDATE posts SET  removed=fasle WHERE id=${req.body.id};`, (error, results) => {
        if (error) {
            res.type('application/json');
            res.status(400).json({ error });
            return;
        };
        res.type('application/json')
        res.status(204).json(results.affectedRows);
    });
});

app.post('/api/posts.like', allowCrossDomain, async (req, res) => {
    connection.query(`UPDATE posts SET likes=likes+1 WHERE id=${req.body.id};`, (error, results) => {
        if (error) {
            res.type('application/json');
            res.status(400).json({ error });
            return;
        };
        res.type('application/json')
        res.status(204).json(results.affectedRows);
    });
});

app.post('/api/posts.like', allowCrossDomain, async (req, res) => {
    connection.query(`UPDATE posts SET likes=likes-1 WHERE id=${req.body.id};`, (error, results) => {
        if (error) {
            res.type('application/json');
            res.status(400).json({ error });
            return;
        };
        res.type('application/json')
        res.status(204).json(results.affectedRows);
    });
});

app.listen(PORT, () => console.log(`App started at port ${PORT}...`));
