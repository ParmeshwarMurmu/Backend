const express = require('express')
const {connection} = require('./Config/db')
require('dotenv').config()
const {userRoute} = require('./Routes/userRoutes')
const {postRoute} = require('./Routes/postRoutes')
const cors = require('cors')

const app = express()


app.use(express.json())
app.use(cors())
app.use('/users', userRoute)
app.use('/posts', postRoute)


app.listen(process.env.PORT, async()=>{

    try {
        console.log("connecting to DB");
        await connection
        console.log("connected to DB");
        console.log(`expres servert at ${process.env.PORT}`);
    } catch (error) {
        console.log("Something went wrong");
        console.log(error);
    }

})