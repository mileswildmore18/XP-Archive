const router = require('express').Router();
const dashRoutes = require('./dashRoutes');
require('dotenv').config();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/project', dashRoutes);


module.exports = router;
