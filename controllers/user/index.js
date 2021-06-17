const mongoose = require('mongoose');
const User = require('../../models/user');
const BadRequestError = require('../../errors/badRequest');
const notFoundError = require('../../errors/notFound');

const getAllUsers = async(req, res) => {
    const users = await User.find({});
    
    res.send(users);
};

const addNewUser = async(req, res) => {
    const {name, position, age} = req.body;
    
    const user = new User({
        name,
        position,
        age
    });
    await user.save();
    
    res.status(201);
    res.json(user);
};

const getUserById = async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id))
        throw new BadRequestError("id is not valid");
    
    const user = await User.findById(id);
    
    if(!user)
        throw new notFoundError("user not found");
    
    res.send(user);
};

const updatedUserById = async (req, res) => {
    const {id} = req.params;
    const {name, position, age} = req.body;
    
    if(!mongoose.Types.ObjectId.isValid(id))
        throw new BadRequestError("id is not valid");
    
    const user = await User.findById(id);
    if(!user)
        throw new notFoundError("user not found");
    
    user.set({
        name,
        position, 
        age
    });
    
    await user.save();
    
    res.send(user);
};

const deleteUserById = async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id))
        throw new BadRequestError("id is not valid");
    
    const user = await User.findByIdAndDelete(id);
    
    if(!user)
        throw new notFoundError("user not found");
    
    res.send(user);
};

module.exports = {
    getAllUsers,
    addNewUser,
    getUserById,
    updatedUserById,
    deleteUserById
};