const router = require('express').Router();
const {
    getAllThoughts,
    getOneThought,
    createThought,
    deleteThought,
    updateThought,
} = require('../../controllers/thoughtController');

const {
    postReaction,
    deleteReaction
} = require('../../controllers/reactionConroller')

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

// I miss read the acceptance criteria/breif so i have two routes to send a reaction
router.route('/:thoughtId/reactions').post(postReaction).delete(deleteReaction);

module.exports = router;