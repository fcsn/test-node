var users = [
    { id: 1, name: 'alice'},
    { id: 2, name: 'bek'},
    { id: 3, name: 'chris'}
]

const index = function (req, res) {
    // 기본 값
    req.query.limit = req.query.limit || 10;
    // query는 문자열로 받아온다
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
}

const show = function (req, res) {
    const id = parseInt(req.params.id, 10);
    const user = users.filter((user) => user.id === id)[0];
    res.json(user);
}

const destroy = (req, res) => {
    const id =parseInt(req.params.id);
    if (Number.isNaN(id)) return res.status(400).end();

    users.filter(user => user.id !== id);
    res.status(204).end();
}

const create = (req, res) => {
    const name = req.body.name;
    // 응답 바디는 없고 헤더만 보낼때는 상태값만 설정 후 .end()
    if (!name) return res.status(400).end();

    const isConfilc = users.filter(user => user.name === name).length
    if (isConfilc) return res.status(409).end();

    const id = Date.now();
    const user = {id, name};
    users.push(user);
    res.status(201).json(user);
}

const update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if (!name) return res.status(400).end();

    const isConflict = users.filter(user => user.name === name).length;
    if (isConflict) return res.status(409).end();

    const user = users.filter(user => user.id === id)[0];
    if (!user) return res.status(404).end();

    user.name = name;

    res.json(user);
}

module.exports = {
    index,
    show,
    destroy,
    create,
    update
}