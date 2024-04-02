const { Users, Thoughts } = require('../models');

module.exports = {
    async postReaction(req,res){
        try {
            const thought = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {
                    $push: {
                        reactions: {
                            reactionBody: req.body.reactionBody,
                            username: req.body.username
                        }
                    }
                },
                { new: true }
            );
            if(!thought){
            res.status(404).json({message: 'could not find that thought'});
            }
           res.status(200).json(thought);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async deleteReaction(req, res) {
        try {
            const reaction = await Thoughts.findOneAndUpdate(
                { 'reactions.reactionId': req.params.reactionId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );

            if (!reaction) {
                return res.status(404).json({ message: 'Reaction was not found' });
            }
    
            return res.status(200).json({ message: 'Reaction was removed' });
        } catch (error) {
            return res.status(500).json(error);
        }
    },

}