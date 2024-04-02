const router = require('express').Router();
const {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
} = require('../../controllers/userController');

router.route('/').get(getUser).post(createUser);

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').put(addFriend);



module.exports = router;