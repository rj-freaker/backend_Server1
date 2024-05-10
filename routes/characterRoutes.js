const express = require('express');
const Character = require('../models/Character');
const router = express.Router();

router.get('/', async (req,res) => {
    try{
        const data = await Character.find();
        res.status(200).json({data});
    }catch(err){
        res.status(500).json({
            text: 'Some error occured',
            message: err 
        })
    }
});

router.post('/', async (req,res) => {
    try{
        const data = req.body;
        const newCharacter = new Character(data);
        const response = await newCharacter.save();
        
        res.status(200).json({response});
    }catch(err){
        res.status(500).json({
            text: 'some error',
            message: err
        })
    }
});

router.put('/:character_id', async (req,res) => {
    try{
        const getId = req.params.character_id;
        const characterData = req.body;
        const response = await Character.findByIdAndUpdate(getId,characterData, {
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

router.delete('/:character_id', async (req,res) => {
    try{
        const getID = req.params.character_id;
        const response = await Character.findByIdAndDelete(getID);
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