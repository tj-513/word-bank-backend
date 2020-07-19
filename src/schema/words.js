const { celebrate, Joi, errors, Segments } = require('celebrate');

const addWordValidator = celebrate({
  [Segments.BODY]: Joi.object({
    word: Joi.string().required().max(50).empty(),
    definition: Joi.string().required().max(1000),
    sampleSentence: Joi.string().max(1000),
  }),
});

const updateWordValidator = celebrate({
  [Segments.BODY]: Joi.object({
    _id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
    word: Joi.string().required().max(50),
    definition: Joi.string().required().max(1000),
    sampleSentence: Joi.string().max(1000),
  }),
});

const deleteWordValidator = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string()
      .required()
      .regex(/^[0-9a-fA-F]{24}$/),
  }),
});

const getWordsValidator = celebrate({
  [Segments.QUERY]:{
    sortBy: Joi.string().valid('word', 'definition', 'dateCreated', 'dateModified'),
    sortOrder: Joi.string().valid('asc', 'desc'),
    page: Joi.number().integer().positive(),
    pageSize: Joi.number().integer().positive()
  }
})

module.exports = {
  addWordValidator,
  updateWordValidator,
  deleteWordValidator,
  getWordsValidator,
};
