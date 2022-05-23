const express = require('express');

const fs = require('fs');

const routes = express.Router();
const talkerData = 'talker.json';

routes.get('/', (_req, res) => {
    const readFile = fs.readFileSync(talkerData);
    const talker = JSON.parse(readFile);
    res.status(200).json(talker);
});
routes.get('/search', (req, res) => {
    const readFile = fs.readFileSync(talkerData);
    const talker = JSON.parse(readFile);
    const { name } = req.query;

    if (name === '' || undefined) {
        return res.status(200).json(talker);
    }

    const talkerperson = talker.filter((user) =>
        user.name.toLowerCase().includes(name.toLocaleLowerCase()));

    res.status(200).json(talkerperson);
});

routes.get('/:id', (req, res) => {
    const { id } = req.params;
    const readFile = fs.readFileSync(talkerData);
    const talker = JSON.parse(readFile);
    const talkerId = talker.find((user) => user.id === Number(id));

    if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    res.status(200).json(talkerId);
});

module.exports = routes;