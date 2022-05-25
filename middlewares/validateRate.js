function validateRate(req, res, next) {
    const { rate } = req.body.talk;
    // console.log(rate);
    if (rate === undefined || rate === '') { 
        return res.status(400).json(
            { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
            );
    }
    if (Number(rate) < 1 || Number(rate) > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
}

module.exports = validateRate;