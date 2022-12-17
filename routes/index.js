const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../models/model");

//Get all users
router.get('/', async(request, response) => {
    try{
        const data = await db.find();
        response.json(data);
    } catch(err) {
        response.status(400);
        response.send("Error: " + err);
    }
})

//Get User By Id
router.get('/:userId', async (request, response) => {
    try{
        const { userId } = request.params;
        const userData = await db.find({_id: userId});
        response.json(userData);
    } catch(err) {
        response.status(400);
        response.send("Error: " + err);
    }
})

//Add as user
router.post('/createUser', async(request, response) => {
    try{
        const data = await db(request.body);
        response.send("User Added Successfully");
        data.save();
    } catch(err) {
        response.send(400);
        response.send("Error: " + err);
    }
})

//Add multiple users
router.post('/createUsers', async (request, response) => {
    try {
        const data = await db.insertMany(request.body);
        response.send("Users Added Succesfully");
    } catch(err) {
        response.status(400);
        response.send("Error: " + err);
    }
})


//Update User Details
router.put('/updateUser/:userId/', async (request, response) => {
    try {
        const { userId } = request.params;
        await db.updateOne({_id: userId}, {$set: request.body})
        response.send("User Updated Successfully")
    } catch(err) {
        response.status(400);
        response.send("Error: " + err);
    }
})

//Delete User
router.delete('/deleteUser/:userId/', async (request, resposne) => {
    try{
        const { userId } = request.params;
        await db.deleteOne({_id: userId});
        resposne.send("User Deleted Succesfully");
    } catch(err) {
        response.status(400);
        resposne.send("Error: " + err);
    }
})

module.exports = router;
