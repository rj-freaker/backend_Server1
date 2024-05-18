const express = require('express');
const Person = require('../models/Person');
const {jwtAuthMiddleware, generateToken} = require('../jwtAuth');
const router = express.Router();

router.get('/', jwtAuthMiddleware, async(req,res) => {
    try{
        const data = await Person.find();
        res.status(200).json({data});
    }catch(err){
        res.status(500).json({
            text : 'Some error',
            message : err
        })
    }
});

router.get('/profile',jwtAuthMiddleware, async(req,res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await Person.findById(userId);
        res.status(200).json({user});
    }catch(err){
        res.status(500).json({
            message: err
        })
    }
});

router.post('/signup', async(req,res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();

        const payload = {
            id : response.id,
            userName : response.userName
        }
        const token = generateToken(payload);
        
        res.status(200).json({response:response, token: token});
    }catch(err){
        res.status(500).json({
            text : 'some error occured',
            message : err
        })
    }
});

router.post('/signin', async (req,res) => {
    try{
        const {userName, passWord} = req.body;
        const user = await Person.findOne({userName: userName});

        if(!user || !(await user.comparePassword(passWord))){
            return res.status(401).json({
                message: 'user or password is incorrect'
            })
        }

        const payload = {
            id : user.id,
            username : user.userName
        }

        const token = generateToken(payload);

        res.status(200).json({token});
    }catch(err){
        res.status(500).json({
            message: err
        })
    }
})

router.get('/:profession', async(req,res) => {
    try{
        const workType = req.params.profession;
        if(workType == 'Developer' || workType == 'Debugger' || workType == 'Analyst' || workType == 'Programmer' || workType == 'Manager'){
            const response = await Person.find({work: workType});
            res.status(200).json({response});
        }else{
            res.status(404).json({
                text: 'Enter a legal entry'
            })
        }
    }catch(err){
        res.status(500).json({
            text : 'Some error occuredd',
            message : err
        })
    }
});

router.put('/:person_id', async (req,res) => {
    try{
        const getId = req.params.person_id;
        const personData = req.body;
        const response = await Person.findByIdAndUpdate(getId,personData, {
            new: true,
            runValidators: true
        });

        if(!response){
            return res.status(404).json({message: 'not found'});
        }
        res.status(200).json({response});
    }catch(err){
        res.status(500).json({
            text: 'some error',
            message: err
        })
    }
});

router.delete('/:person_id', async (req,res) => {
    try{
        const getID = req.params.person_id;
        const response = await Person.findByIdAndDelete(getID);
        if(!response){
            return res.status(404).json({message: 'not found'});
        }
        res.status(200).json({message: 'deleted successfully'});
    }catch(err){
        res.status(500).json({
            text: 'some error occured',
            message: err
        })
    }
});

module.exports = router;
