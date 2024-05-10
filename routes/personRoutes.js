const express = require('express');
const Person = require('../models/Person');

const router = express.Router();

router.get('/', async(req,res) => {
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

router.post('/', async(req,res) => {
    try{
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        res.status(200).json({response});
    }catch(err){
        res.status(500).json({
            text : 'some error occured',
            message : err
        })
    }
});

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
