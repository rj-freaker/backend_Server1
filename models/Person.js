const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: {
        type : String,
        maxlength : 20,
        required: true
    },
    age: {
        type : Number
    },
    work: {
        type : String,
        enum : ['Developer','Debugger','Analyst','Manager','Programmer'],
        required:true
    },
    mobile: {
        type : String,
        unique : true,
        required:true
    },
    email: {
        type : String,
        unique: true,
        required:true
    }
});

const Person = mongoose.model('People',PersonSchema);

module.exports = Person;