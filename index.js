const express = require('express');
const router = require('./routes/routes');
const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(router)
app.listen(port , ()=>{
    console.log('server is up on ' + port);
})

// const time = '15:00'
// const end = '16:00'
// console.log(+time.split(':')[0])
// console.log(+time.split(':')[0] < +end.split(':')[0] )
