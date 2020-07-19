const express = require('express');
const wordValidators = require('../schema/words');
const wordGameValidators = require('../schema/wordGame');

const wordRoutes = require('./words');
const wordGameRoutes = require('./wordGame');
const healthCheck = require('./healthCheck');

const router = express.Router();
//#region word endpoint
router.get('/words', wordValidators.getWordsValidator, wordRoutes.getWords);
router.get('/words/all', wordRoutes.getAllWords);
router.post('/words', wordValidators.addWordValidator, wordRoutes.addWord);
router.put('/words', wordValidators.updateWordValidator, wordRoutes.updateWord);
router.delete(
  '/words/:id',
  wordValidators.deleteWordValidator,
  wordRoutes.deleteWord
);
//#endregion

//#region wordgame
router.get(
  '/wordGame/questions',
  wordGameValidators.getWordsForGameValidator,
  wordGameRoutes.getWordsForGame
);
router.patch(
  '/wordGame/results',
  wordGameValidators.updateGameResultValidator,
  wordGameRoutes.updateWordGameResult
);
//#endregion
router.get('/version', healthCheck.greetings);

module.exports = router;
