const router = require('express').Router();
const {
    postReaction,
    deleteReaction,
} = require('../../controllers/reactionConroller');

router.route('/:thoughtId/reactions').post(postReaction);

router.route('/:reactionId').delete(deleteReaction);

module.exports = router;
