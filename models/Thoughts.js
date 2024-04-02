const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const thoughtsSchema = new mongoose.Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            ref: 'user'
        },
        reactions: [
            {
                reactionId: {
                    type: mongoose.Schema.Types.ObjectId,
                    default: () => new mongoose.Types.ObjectId(),
                },
                reactionBody: {
                    type: String,
                    required: true,
                    maxLength: 280,
                },
                username: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                    get: (createdAt) => {
                        return new Date(createdAt).toLocaleString();
                    },
                },
            },
        ],
    }, 
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
   }
);

thoughtsSchema
    .virtual('totalReactions')
    .get(function(){
        return this.reactions.length;
    });


const Thoughts = mongoose.model('thought', thoughtsSchema);

module.exports = Thoughts;