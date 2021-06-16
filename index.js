const express = require('express');
require('express-async-errors');
const mongoose = require('mongoose');
const app = express();
const carRouter = require('./routes/car');
const userRouter = require('./routes/user');
const errorHandler = require('./middlewares/errorHandler');
const notFoundError = require('./errors/notFound');

app.use(express.json());
app.use(carRouter);
app.use(userRouter);

app.all("*", async (req, res, next) => {
    throw new notFoundError();
});

app.use(errorHandler);

const start = async () => {
    
    try{
        await mongoose.connect("mongodb://localhost/highway", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });  
    }catch(e){
        console.log(e);
    }
    
    app.listen(5000, () => {
        console.log("Server is listening on PORT 5000!!!");
    });
};

start();