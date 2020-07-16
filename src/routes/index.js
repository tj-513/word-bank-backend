const express = require('express');

const wordRoutes = require('./words');
const wordGameRoutes = require('./wordGame');
const healthCheck = require('./healthCheck');

const router = express.Router();

router.get('/words', wordRoutes.getWords);
router.get('/words/all', wordRoutes.getAllWords );
router.post('/words', wordRoutes.addWord);
router.put('/words', wordRoutes.updateWord);
router.delete('/words/:id', wordRoutes.deleteWord);

router.get('/wordGame/questions', wordGameRoutes.getWordsForGame);
router.patch('/wordGame/results', wordGameRoutes.updateWordGameResult);

router.get('/version', healthCheck.greetings);

module.exports = router;
