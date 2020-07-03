const express = require('express');

const wordRoutes = require('./words');
const healthCheck = require('./healthCheck');

const router = express.Router();

router.get('/words/all', wordRoutes.getWords );
router.post('/words', wordRoutes.addWord);
router.put('/words', wordRoutes.updateWord);
router.delete('/words/:id', wordRoutes.deleteWord);

router.get('/version', healthCheck.greetings);

module.exports = router;
