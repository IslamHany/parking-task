const express = require("express");
const {body, check} = require("express-validator");
const validateRequest = require('../middlewares/validateRequest');
const {
    getAllCars,
    getCarById,
    addNewCar,
    updateCarById,
    deleteCarById,
    passThrough
} = require('../controllers/car');
const router = express.Router();
const validationError = require('../errors/validationError');
const mongoose = require('mongoose');

//Get all cars
router.get("/car", getAllCars);

//Get car by Id
router.get("/car/:id", getCarById);

//Update car by id
router.put("/car/:id", updateCarById);

//Pass through route (deduct 4$)
router.put("/car/:id/pass", passThrough);

//Add new car
router.post("/car", [
    check("brand", "brand is required").not().isEmpty(),
    check("model", "model is required").not().isEmpty(),
    check("plateNumber", "plateNumber is required").not().isEmpty(),
    body("userId")
        .not().isEmpty()
        .custom((input) => mongoose.Types.ObjectId.isValid(input))
        .withMessage("userId is required and must be valid")
], validateRequest, addNewCar);

//Delete car by id
router.delete("/car/:id", deleteCarById);

module.exports = router;