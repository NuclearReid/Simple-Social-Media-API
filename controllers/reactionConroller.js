const { Users, Thoughts } = require('../models');

module.exports = {
    async postReaction(req,res){
        try {
            const thought = await Thoughts.findOneAndUpdate(
                // filters for the _id of the thought that will be getting the reaction
                { _id: req.params.thoughtId },
                {
                    // adds the new reaction to the reactions array
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
                // this first {} is the filter. 
                // makes sure the document being updated has a reactions array with an object that has a reactionId that matches the req.params.reactionId
                { 'reactions.reactionId': req.params.reactionId },
                // then it removes the object with that reactionId from the array
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