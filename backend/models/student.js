const mongoose = require('mongoose');

const Student = mongoose.model('Student', {
    name : {type: String},
    gender: {type: String},
    city: {type: String},
    pincode:{type:Number}
});

module.exports = Student;