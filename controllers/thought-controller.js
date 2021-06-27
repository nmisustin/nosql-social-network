const {Thought} = require('../models');

const thoughtController = {
    getAllThoughts(req, res){
        Thought.find({})
            .populate({
                select: '-__v'
            })
            .select('-__v')
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    getThoughtById({params}, res){
        Thought.findOne({_id: params.id})
            .populate({
                select: '-__v'
            })
            .select('-__v')
            .then(thoughtData => {
                if(!thoughtData){
                    res.status(404).json({message: 'no thought with this id found'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    addThought({body}, res){
        Thought.create(body)
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    updateThought({params, body}, res){
        Thought.findOneAndUpdate({_id: params.id}, body, {new: true})
            .then(thoughtData => {
                if(!thoughtData){
                    res.status(404).json({message: 'no thought with this id found'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    deleteThought({params}, res){
        Thought.findOneAndDelete({_id: params.id})
            .then(thoughtData => {
                if(!thoughtData){
                    res.status(404).json({message: 'no thought with this id found'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    addReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
        )
            .then(thoughtData => {
                if(!thoughtData){
                    res.status(404).json({message: 'no thought with this id found'});
                    return;
                }
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    deleteReaction({params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactionId: params.reactionId}},
            {new: true}
        )
            .then(thoughtData => res.json(thoughtData))
            .catch(errr => {
                console.log(err);
                res.status(400).json(err);
            })
    }
}

module.exports = thoughtController