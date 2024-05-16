const router = require('express').Router();
require('dotenv').config();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);



module.exports = router;
