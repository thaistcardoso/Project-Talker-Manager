const express = require('express');
const { validateEmail, validatePassword } = require('../middlewares/index');

const router = express.Router();

router.post('/', validateEmail, validatePassword, (req, res) => {
    const randomToken = req.token;
    res.status(200).json({ token: randomToken });    
});

module.exports = router;
