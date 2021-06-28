const {User} = require('../models');

const userController ={
    getAllUsers(req,res){
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    getUserById({params}, res){
        User.findOne({_id: params.id})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(userData => {
                if(!userData){
                    res.status(404).json({message: 'No user with this id found!'});
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    createUser({body}, res){
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    updateUser({params, body}, res){
        User.findByIdAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
            .then(userData => {
                if(!userData){
                    res.status(404).json({message: 'no user with this id found!'});
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    deleteUser({params}, res){
        User.findByIdAndDelete({_id: params.id})
            .then(userData => {
                if(!userData){
                    res.status(404).json({message: 'No user with this id found!'});
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    addFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true}
        )
            .then(userData => {
                if(!userData){
                    res.status(404).json({message: 'no user with this id found'});
                    return;
                }
                res.json(userData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },
    removeFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    }
}

module.exports= userController