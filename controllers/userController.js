const { Users, Thoughts} = require('../models');

module.exports = {

    async createUser(req, res){
        try {
            const user = await Users.create(req.body);
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
    async getUser(req, res){
        try {
            const user = await Users.find();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async getSingleUser(req, res){
        try {
            const user = await Users.find({_id: req.params.userId})
            .select('-__v');
            if(!user){
                return res.status(404).json({message: "no user found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async updateUser(req, res){
        try {
            // pretty simple, gets the user id from the params, updates the data with the req.body
            const user = await Users.findByIdAndUpdate(req.params.userId, req.body)
            .select('-__v');
            if(!user){
                return res.status(404).json({message: "no user found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async deleteUser(req, res){
        try {
            const user = await Users.findByIdAndDelete(req.params.userId)
            .select('-__v');
            if(!user){
                return res.status(404).json({message: "no user found"});
            }
            // In here, include deleting the user's thoughts too.
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    // friend list management
    async addFriend(req, res){
        try {
            // looks at the two params sent (user and friend) then adds the friendId to the user's 'friends' array
            const user = await Users.findByIdAndUpdate(
                req.params.userId, 
                {$addToSet: {friends: req.params.friendId}},
                {new: true}
            );
            if(!user){
                return res.status(404).json({message: "no user found"});
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(200).json(error);
        }
    },
    async removeFriend(req, res){
        try {
            // same as above but $pull from the array instead of $addToSet
            const user = await Users.findByIdAndUpdate(
                req.params.userId,
                {$pull: {friends: req.params.friendId}},
                {new: true},
            );
            if(!user){
                return res.status(404).json({message: 'no user found'});
            }
            res.status(200).json({message: 'Friend removed from friend list'})
            
        } catch (error) {
            res.status(500).json(error);
        }
    },    
}