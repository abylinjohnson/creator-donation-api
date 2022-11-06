const express = require('express');
const donateContoller = require('../controllers/donateConroller')

const router = express.Router();

router.post('/', donateContoller.donate)

module.exports = router;