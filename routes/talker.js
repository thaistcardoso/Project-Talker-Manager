const express = require('express');
const fs = require('fs');
const { authorizationToken, validateName, validateAge,
        validateTalk, validateRate, validateWatchedAt,
} = require('../middlewares/index');

const routes = express.Router();
const talkerData = 'talker.json';

// routes.use(authorizationToken);

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

routes.post('/', authorizationToken, validateName, validateAge, 
validateTalk, validateRate, validateWatchedAt, (req, res) => {
    const { name, age, talk } = req.body;
    const readFile = fs.readFileSync(talkerData);
    const talker = JSON.parse(readFile);

    const lastIndex = talker.length;
    const newId = lastIndex + 1;
    
    const talkerObj = {
        id: newId,
        name,
        age,
        talk,
    };

    talker.push(talkerObj);
    // console.log(talker);
    fs.writeFileSync(talkerData, JSON.stringify(talker));
    res.status(201).json(talkerObj);
});

routes.put('/:id', authorizationToken, validateName, validateAge, 
validateTalk, validateRate, validateWatchedAt, (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    const readFile = fs.readFileSync(talkerData);
    const talker = JSON.parse(readFile);
    // console.log(talker);

    const talkerIndex = talker.findIndex((user) => user.id === Number(id));

    if (talkerIndex === -1) {
        return res.status(404).json({ message: 'A pessoa palestrante não encontrada' });
    }

    talker[talkerIndex] = { id: +id, name, age, talk };
    fs.writeFileSync(talkerData, JSON.stringify(talker));
    console.log(talker[talkerIndex]);
    res.status(200).json(talker[talkerIndex]);
});

routes.delete('/:id', authorizationToken, (req, res) => { 
    const { id } = req.params;

    const readFile = fs.readFileSync(talkerData);
    const talker = JSON.parse(readFile);
    
    const talkerIndex = talker.findIndex((user) => user.id === Number(id));

    if (talkerIndex === -1) {
        return res.status(404).json({ message: 'A pessoa palestrante não encontrada' });
    }

    talker.splice(talkerIndex, 1);
    const convertTalker = JSON.stringify(talker);
    fs.writeFileSync(talkerData, convertTalker);
    res.status(204).end();
});

module.exports = routes;