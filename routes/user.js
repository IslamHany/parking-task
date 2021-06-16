const express = require('express');
const {check} = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');

const {
    getAllUsers,
    addNewUser,
    getUserById,
    updatedUserById,
    deleteUserById
} = require("../controllers/user")
const router = express.Router();

//Get all users
router.get("/user", getAllUsers);

//Add new user
router.post('/user', [
    check("name", "name is required").not().isEmpty(),
    check("position", "position is required").not().isEmpty(),
    check("age", "age must be a number and at least 18").isFloat({gt: 18})
], validateRequest, addNewUser);

//Get user by id
router.get('/user/:id', getUserById);

//Update user by id
router.put('/user/:id', [
    check("name", "name is required").not().isEmpty(),
    check("position", "position is required").not().isEmpty(),
    check("age", "age must be a number and at least 18").isFloat({gt: 18})
], validateRequest, updatedUserById);

//Delete user by id
router.delete('/user/:id', deleteUserById);

module.exports = router;