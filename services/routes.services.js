const fun = require('../function')

const isvaliddate = (date) => {
var date_regex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/ ;
    return ( date_regex.test(date))
}

const isvalidtime = (time) =>{
    var time_regex = /^([0-1][0-9]|2[0-3]):?([0][0])$/;
    return time_regex.test(time);
}

const service = {

    createroom: (req, res)=> {
        try{
            const data = fun.loadData("rooms.json")
            const keys = Object.keys(req.body).map(k => k.toLowerCase());
            const required = ['name' , 'number of seats available' , 'amenities in room' , 'price for 1 hour'];
            const isvalid = (req.body.name.trim().length>0 && +req.body['number of seats available']>0 && +req.body['price for 1 hour']>0 );
            if(isvalid){
                if(!(JSON.stringify(required)==JSON.stringify(keys))){
                    return res.status(400).send("please include all details ['name' , 'number of seats available' , 'amenities in room' , 'price for 1 hour']")
                }
                else{
                    data.push({...req.body});
                    fun.savedata('rooms.json',data);
                    res.status(201).send("added room")
                }
            }
            else{
                return res.status(404).send("check the details and try again")
            }
        }
        catch(e){
            res.status(400).send(e)
        }
    },

    getrooms: (req,res)=>{
        const data = fun.loadData("rooms.json")
        res.send(data)
    },

    bookroom: (req,res)=>{
        try{
            const data = fun.loadData("booked.json")
            const keys = Object.keys(req.body).map(k => k.toLowerCase());
            const required = ['customer name' , 'date' , 'start time' , 'end time', 'room id']
            const roomdata = fun.loadData("rooms.json")
            const isvalid = roomdata.find( ele => ele.name===req.body["room id"]  && isvaliddate(req.body.Date) && isvalidtime(req.body["start time"]) && isvalidtime(req.body["end time"]))
            if(!isvalid){
                if(!isvaliddate(req.body.Date))
                    return res.status(400).send("Enter valid date.");
                if(!(isvalidtime(req.body["start time"]) && isvalidtime(req.body["end time"])))
                    return res.status(400).send("Enter time only in hours don't enter minutes (00:00 - 23:00) minutes should always be 00");

                return res.status(400).send("Enter valid room id.")
            }

            const isvaliddatetime = data.filter( ele => (ele["room id"] === req.body["room id"] && ele.Date===req.body["Date"] && 
            (((+req.body["start time"].split(':')[0] <= +ele["start time"].split(':')[0] &&
            +req.body["end time"].split(':')[0] > +ele["start time"].split(':')[0]) 
            ||
            (+req.body["start time"].split(':')[0] < +ele["end time"].split(':')[0] &&
            +req.body["end time"].split(':')[0] >= +ele["end time"].split(':')[0])) ||
            ((+req.body["start time"].split(':')[0] >= +ele["start time"].split(':')[0] &&
            +req.body["start time"].split(':')[0] < +ele["end time"].split(':')[0]) 
            ||
            (+req.body["end time"].split(':')[0] > +ele["start time"].split(':')[0] &&
            +req.body["end time"].split(':')[0] <= +ele["end time"].split(':')[0])) )
            ))
            
            // console.log( isvaliddatetime)
            if(isvaliddatetime.length === 0){
                if(!(JSON.stringify(required)==JSON.stringify(keys))){
                    return res.status(400).send("please include all details ['customer name' , 'Date in (dd/mm/yyy)' , 'start time' , 'end time', 'room id']")
                }
                else{
                    data.push({...req.body});
                    fun.savedata('booked.json', data);
                    res.status(201).send("booked room")
                }
            }
            else{
                return res.status(400).send("Room already booked with the entered date and time try booking with different date and time.")
            }
        }
        catch(e){
            res.status(400).send(e)
        }
    },

    bookedhis: (req,res) =>{
        const data = fun.loadData("booked.json")
        res.send(data)
    },

    rooms_booked_list: (req,res) =>{
        const data = fun.loadData("rooms.json")
        const bookeddata = fun.loadData("booked.json")
        const bookedlist = data.map(ele=>({roomname:ele.name , booked_list:bookeddata.filter(ele1 => ele1["room id"]===ele.name)}));
        res.send(bookedlist)
    },

    customer_booked_list: (req,res) =>{
        const data = fun.loadData("booked.json")
        res.send(data)
    }
}

module.exports = service;