# hall-booking

postman documentation link
https://documenter.getpostman.com/view/16251431/UVC9fQcw


The Hall Booking API is used to create a room and allows use to book the room with particular date and time.

## Endpoints
GET /

GET /rooms_booked_list

GET /customer_booked_list

POST /createroom

POST /bookroom


## POST create room
https://thehallbooking.herokuapp.com/createroom

/createroom - is used to create a room with the details ['name' , 'number of seats available' , 'amenities in room' , 'price for 1 hour']

Bodyraw (json)
json
{
  "name": "i grand",
  "number of seats available": "12",
  "Amenities in room": "wifi , car parking , 24hrs power and water",
  "price for 1 hour": "120"
}


## GET get rooms
https://thehallbooking.herokuapp.com/
/ - gets all the created rooms

## POST bookroom
https://thehallbooking.herokuapp.com/bookroom
/bookroom - is used to book a room with the details ['customer name' , 'Date in (dd/mm/yyy)' , 'start time(24 hrs format only)' , 'end time (24 hrs format only)', 'room id'].

Note

### 1) don't enter minutes only hours are valid
12:00 -valid
02:30 -invalid
12:40 -invalid
03:00 -valid

### 2) date should be only entered in dd/mm/yyyy.

Bodyraw (json)
json
{
  "customer name": "manoj",
  "Date": "13/11/2021",
  "start time": "12:00",
  "end time": "14:00",
  "room id": "2 star"
}

## GET rooms_booked_list
https://thehallbooking.herokuapp.com/rooms_booked_list
/rooms_booked_list - gives us all room names along with the booked data

## GET customer_booked_list
https://thehallbooking.herokuapp.com/customer_booked_list
/customer_booked_list - will gives the customer booked list
