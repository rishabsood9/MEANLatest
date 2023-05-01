const express = require('express');
const router = express.Router();

const ObjectId = require('mongoose').Types.ObjectId;

const Student = require('../models/student.js');


// Get , Post, Put, Delete
// Base path: http://localhost:3000/students

// Get Api
router.get('/', (req, res)=> {
    Student.find( (err, doc) =>{
        if(err){
            console.log('Error in Get Data'+err)
        }else{
            res.send(doc);
        }
    })
});

// Get Single Student Api
router.get('/:id', (req, res)=> {
    if(ObjectId.isValid(req.params.id)){
        Student.findById(req.params.id, (err, doc) =>{
            if(err){
                console.log('Error in Get Student by id '+ err)
            }else{
                res.send(doc);
            }
        });
    }else{
        return res.status(400).send('No record found with id' + req.params.id)
    }
});

// Post Api
router.post('/', (req, res)=> {
    let emp = new Student({
        name : req.body.name,
        gender: req.body.gender,
        city: req.body.city,
        pincode: req.body.pincode
    });

    emp.save( (err, doc)=>{
        if(err){
            console.log('Error in Post Data'+err)
        }else{
            res.send(doc);
        }
    })
});


// Put Api
router.put('/:id', (req, res)=> {
    if(ObjectId.isValid(req.params.id)){

        let emp = {
            name : req.body.name,
            gender: req.body.gender,
            city: req.body.city,
            pincode: req.body.pincode
        };

        Student.findByIdAndUpdate(req.params.id, {$set :emp}, {new:true}, (err, doc) =>{
            if(err){
                console.log('Error in Update Student by id '+ err)
            }else{
                res.send(doc);
            }
        });
    }else{
        return res.status(400).send('No record found with id' + req.params.id)
    }
});


// Delete Api
router.delete('/:id', (req, res)=> {
    if(ObjectId.isValid(req.params.id)){
        Student.findByIdAndRemove(req.params.id, (err, doc) =>{
            if(err){
                console.log('Error in Delete Student by id '+ err)
            }else{
                res.send(doc);
            }
        });
    }else{
        return res.status(400).send('No record found with id' + req.params.id)
    }
});

module.exports = router;
