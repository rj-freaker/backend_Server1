const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema(
    {
        name: {
            type : String,
            required : true,
            maxLength: 50
        },
        anime: {
            type : String,
            required : true,
        },
        gender: {
            type : String,
            maxLength : 1,
            required : true
        },
        mainProtagonist: {
            type : Boolean,
            required : true
        }
    }
);

const Character = mongoose.model('Character',CharacterSchema);
module.exports = Character;