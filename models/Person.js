const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    },
    userName: {
        type : String,
        required : true,
        unique : true
    },
    passWord: {
        type : String,
        required : true
    }
});

PersonSchema.methods.comparePassword = async function(userPassword){
    try{
        const isMatch = await bcrypt.compare(userPassword, this.passWord);
        return isMatch;
    }catch(err){
        throw err;
    }
}

PersonSchema.pre('save', async function (next) {
    const person = this;
    if(!person.isModified('passWord')) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.passWord, salt);
        person.passWord = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
});

const Person = mongoose.model('People',PersonSchema);

module.exports = Person;