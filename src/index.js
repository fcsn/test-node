const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

var users = [
    { id: 1, name: 'alice'},
    { id: 2, name: 'bek'},
    { id: 3, name: 'chris'}
]

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/users', function (req, res) {
    // 기본 값
    req.query.limit = req.query.limit || 10;
    // query는 문자열로 받아온다
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
})

app.get('/users/:id', function (req, res) {
    const id = parseInt(req.params.id, 10);
    const user = users.filter((user) => user.id === id)[0];
    res.json(user);
})

app.delete('/users/:id', (req, res) => {
    const id =parseInt(req.params.id);
    if (Number.isNaN(id)) return res.status(400).end();

    users.filter(user => user.id !== id);
    res.status(204).end();
})

app.post('/users', (req, res) => {
    const name = req.body.name;
    // 응답 바디는 없고 헤더만 보낼때는 상태값만 설정 후 .end()
    if (!name) return res.status(400).end();

    const isConfilc = users.filter(user => user.name === name).length
    if (isConfilc) return res.status(409).end();

    const id = Date.now();
    const user = {id, name};
    users.push(user);
    res.status(201).json(user);
})

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const name = req.body.name;

    const user = users.filter(user => user.id === id)[0];
    user.name = name;

    res.json(user);
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})

module.exports = app;