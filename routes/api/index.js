const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes')

router.use('/thoughts', thoughtRoutes);

router.use('/users', userRoutes);

router.use('/reactions', reactionRoutes);


module.exports = router;