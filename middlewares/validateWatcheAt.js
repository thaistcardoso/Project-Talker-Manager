const { dateRegex } = require('../utils/dateRegex');

function validateWatchedAt(req, res, next) {
    const { watchedAt } = req.body.talk;

    // console.log({ watchedAt });

    if (!watchedAt || watchedAt === '') { 
        return res.status(400).json(
            { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
            );
    }
    if (!dateRegex.test(watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
}

module.exports = validateWatchedAt;