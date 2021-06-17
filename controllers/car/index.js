const Car = require('../../models/car');
const User = require('../../models/user');
const NotFoundError = require('../../errors/notFound');
const BadRequestError = require('../../errors/badRequest');
const mongoose = require('mongoose');

const getAllCars = async (req, res) => {
    const cars = await Car.find({});
    
    res.send(cars);
};

const addNewCar = async (req, res) => {
    const {brand, model, plateNumber, userId} = req.body;
    
    const user = await User.findById(userId);
    if(!user)
        throw new NotFoundError("user not found");
    
    const car = new Car({
        brand,
        model,
        plateNumber,
        userId
    });
    
    await car.save();
    
    res.status(201);
    res.json(car);
};

const getCarById = async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id))
        throw new BadRequestError("id is not valid");
    
    const car = await Car.findById(id).populate("userId");
    if(!car)
        throw new NotFoundError("car not found");
    
    res.send(car);
};

const deleteCarById = async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id))
        throw new BadRequestError("id is not valid");
    
    const car = await Car.findByIdAndDelete(id);
    if(!car)
        throw new NotFoundError("car not found");
    
    res.send(car);
};

const updateCarById = async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id))
        throw new BadRequestError("id is not valid");
    
    const car = await Car.findById(id);
    if(!car)
        throw new NotFoundError("car not found");
    
    const {balance, userId, plateNumber, model, brand} = req.body;
    
    if(userId){
        const user = await User.findById(userId);
        if(!user)
            throw new NotFoundError("user not found");
    }
    
    car.set({
        balance: balance || car.balance,
        userId: userId || car.userId,
        plateNumber: plateNumber || car.plateNumber,
        model: model || car.model,
        brand: brand || car.brand,
    });
    
    await car.save();
    
    res.send(car);
};

const passThrough = async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id))
        throw new BadRequestError("id is not valid");
    
    const car = await Car.findById(id);
    if(!car)
        throw new NotFoundError("car not found");
    
    const passAt = car.passAt;
    
    if(passAt == undefined){
        //first time for the car
        car.set({
            passAt: Date.now(),
            balance: car.balance - 4
        });
        await car.save();
        
        return res.send(car);
    }
    
    const timeDiff = (Date.now() - passAt) / (1000); //in seconds
        
    if(timeDiff > 60){ //more than 1 minute
        car.set({
            passAt: Date.now(),
            balance: car.balance - 4
        });
        await car.save();
        
        return res.send(car);
    }
    
    car.set({
        passAt: Date.now()
    });
    
    await car.save();
    
    res.send(car);
};

module.exports = {
    getAllCars,
    addNewCar,
    getCarById,
    updateCarById,
    passThrough,
    deleteCarById
};