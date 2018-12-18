var express = require('express');
var app = express();
var user = [
    { id: 1, name: 'alice'}
]

app.get('/users', function (req, res) {
    res.send('user list');
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
})