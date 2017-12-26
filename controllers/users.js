const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
    index: async(req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },

    //validateBody DONE
    newUser: async(req, res, next) => {
        const newUser = new User(req.value.body);
        const user = await newUser.save();
        res.status(201).json(user)
    },

    //validateParam DONE
    getUser: async(req, res, next) => {
        const { userId } = req.value.params;
        const user = await User.findById(userId);
        res.status(200).json(user)
    },

    //validateParam validateBody DONE
    replaceUser: async(req, res, next) => {
        const { userId } = req.value.params;
        const newUser = req.value.body;
        await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true })
    },

    //validateParam validateBody DONE
    updateUser: async(req, res, next) => {
        const { userId } = req.value.params;
        const newUser = req.value.body;
        await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true })
    },

    //validateParam DONE
    getUserCars: async(req, res, next) => {
        const { userId } = req.value.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json(user.cars)
    },

    //validateParam validateBody DONE
    newUserCar: async(req, res, next) => {
        const { userId } = req.value.params;
        //new a car
        const newCar = new Car(req.value.body);
        //get user
        const user = await User.findById(userId);
        //assign user as a car`s seller
        newCar.seller = user;
        //save
        await newCar.save();
        //add car to the user`s selling array 'cars'
        user.cars.push(newCar);
        await user.save();
        res.status(201).json(newCar)
    }
};