function validateTalk(req, res, next) {
    const { talk } = req.body;
    
    if (!talk || Object.keys(talk).length !== 2 || talk === '') { 
        return res.status(400).json(
            { message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' },
            );
    }
    return next();
}

module.exports = validateTalk;