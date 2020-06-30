const express = require('express');

const wordRoutes = require('./words');

const router = express.Router();

router.get('/words/all', wordRoutes.getWords );
router.post('/words', wordRoutes.addWord);
router.put('/words', wordRoutes.updateWord);
router.delete('/words/:id', wordRoutes.deleteWord);

module.exports = router;
