const Joi = require ('joi');

const VoteAnswer = {
    body : Joi.object().keys({
        status : Joi.number().required(),
    }),
};

module.exports = {
    VoteAnswer,
};