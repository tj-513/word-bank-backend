const express = require('express');

const wordRoutes = require('./words');

const router = express.Router();

router.get('/words', wordRoutes.getWords );
router.post('/words', wordRoutes.addWord);
router.put('/words', wordRoutes.updateWord);
router.delete('/words', wordRoutes.deleteWord);

module.exports = router;
