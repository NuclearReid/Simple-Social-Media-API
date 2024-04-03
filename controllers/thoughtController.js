const { Users, Thoughts} = require('../models');

module.exports = {
    
    
    async createThought(req, res){
        try {
            // deconstructs the req.body
            const { thoughtText, username, userId} = req.body;

            const user = await Users.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            // sends the data to Thoughts 
            const thought = await Thoughts.create({thoughtText, username, userId});
            // pushes the new thought to the user's 'thoughts' array
            user.thoughts.push(thought._id);
            // saves/updates the user
            await user.save()

            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    async getAllThoughts(req, res){
        try {
            const thought = await Thoughts.find({});
            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async getOneThought(req, res){
        try {
            const thought = await Thoughts.findOne({_id: req.params.thoughtId});
            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    
    async deleteThought(req, res){
        try {
            const thought = await Thoughts.findByIdAndRemove({_id: req.params.thoughtId});
            if(!thought){
                return res.status(404).json({message: 'thought not found'});
            }
            const user = await Users.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            );
            if(!user){
                return res.status(404).json({message: 'user not found'});
            }
            res.status(200).json({message: 'thought has been removed!'});
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async updateThought(req, res){
        try {
            const thought = await Thoughts.findByIdAndUpdate(req.params.thoughtId, req.body);
            if(!thought){
                res.status(404).json({message: "couldn't find the thought!"});
            }
            res.status(200).json(thought);
        } catch (error) {
            res.status(500).json(error);    
        }
    }

}