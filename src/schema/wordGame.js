const { celebrate, Joi, Segments } = require('celebrate');

const getWordsForGameValidator = celebrate({
  [Segments.QUERY]: {
    count: Joi.number().integer().min(10).max(100).positive(),
  },
});

const updateGameResultValidator = celebrate({
  [Segments.BODY]: {
    gameResult: Joi.array().items(
      Joi.object({
        _id: Joi.string()
          .required()
          .regex(/^[0-9a-fA-F]{24}$/),
        correct: Joi.boolean().required()
      })
    ),
  },
});

module.exports = {
  getWordsForGameValidator,
  updateGameResultValidator,
};
