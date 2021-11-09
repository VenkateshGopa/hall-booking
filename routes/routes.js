const express = require('express');
const router = express.Router();
const ser= require('../services/routes.services')


router.post('/createroom', ser.createroom)

router.get('/', ser.getrooms)

router.post('/bookroom' , ser.bookroom)

router.get('/bookedhis',ser.bookedhis)
  
//list all rooms with booked data
router.get('/rooms_booked_list', ser.rooms_booked_list)

//list all customers with booked data
router.get('/customer_booked_list', ser.customer_booked_list)

module.exports=router;

// const data = ((+req.body["start time"].split(':')[0] <= +ele["start time"].split(':')[0] &&
//             +req.body["end time"].split(':')[0] > +ele["start time"].split(':')[0]) 
//             ||
//             (+req.body["start time"].split(':')[0] < +ele["end time"].split(':')[0] &&
//             +req.body["end time"].split(':')[0] >= +ele["end time"].split(':')[0]))
            
// ( 
//     ((+req.body["start time"].split(':')[0] <= +ele["start time"].split(':')[0] &&
//     +req.body["end time"].split(':')[0] > +ele["start time"].split(':')[0]) 
//     ||
//     (+req.body["start time"].split(':')[0] < +ele["end time"].split(':')[0] &&
//     +req.body["end time"].split(':')[0] >= +ele["end time"].split(':')[0])) ||
//     (
//         (+req.body["start time"].split(':')[0] >= +ele["start time"].split(':')[0] &&
//         +req.body["start time"].split(':')[0] < +ele["end time"].split(':')[0]) 
//         ||
//         (+req.body["end time"].split(':')[0] > +ele["start time"].split(':')[0] &&
//         +req.body["end time"].split(':')[0] <= +ele["end time"].split(':')[0])) )