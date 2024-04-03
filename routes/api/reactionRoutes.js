const router = require('express').Router();
const {
    postReaction,
    deleteReaction,
} = require('../../controllers/reactionConroller');

// I miss read the acceptance criteria/breif so i have two routes to send a reaction
router.route('/:thoughtId/reactions').post(postReaction);

router.route('/:reactionId').delete(deleteReaction);

module.exports = router;
