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
    const { name } = req.query;
    const readFile = fs.readFileSync(talkerData);
    const talker = JSON.parse(readFile);

    if (name === '' || undefined) {
        return res.status(200).json(talker);
    }
});

module.exports = routes;