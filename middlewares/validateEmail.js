const token = require('../utils/token');

function validateEmail(req, res, next) {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
   
    if (!email.includes('@') && !email.includes('.com')) {
        return res.status(400)
        .json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    
    const randomToken = token();

    req.token = randomToken;

    next();
}

module.exports = validateEmail;