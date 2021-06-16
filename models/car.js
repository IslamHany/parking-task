const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    barnd: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    plateNumber: {
        type: String,
        required: true
    },
    enterAt: {
        type: Date
    },
    exitAt: {
        type: Date
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;