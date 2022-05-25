const validateEmail = require('./validateEmail');
const validatePassword = require('./validatePassword');
const authorizationToken = require('./authorization');
const validateName = require('./validateName');
const validateAge = require('./validateAge');
const validateTalk = require('./validateTalk');
const validateRate = require('./validateRate');
const validateWatchedAt = require('./validateWatcheAt');

module.exports = {
    validateEmail,
    validatePassword,
    authorizationToken,
    validateName,
    validateAge,
    validateTalk,
    validateRate,
    validateWatchedAt,
};