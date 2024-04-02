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
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    async addFriend(req, res){
        try {
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
    
}