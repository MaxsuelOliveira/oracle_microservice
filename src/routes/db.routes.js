const express = require('express');
const router = express.Router();
const { queryHandler, updateHandler } = require('../controllers/db.controller');
const sqlSanitizer = require('../middlewares/sqlSanitizer');

router.use(sqlSanitizer);
// router.post('/test', testHandler);
router.post('/query', queryHandler);
router.post('/update', updateHandler);

module.exports = router;