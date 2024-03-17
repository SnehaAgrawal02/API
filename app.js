const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path:'./.env' });
const web=require('./routes/web');
const connectdb= require('./db/connectdb');
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())

// To upload image
const fileUpload = require('express-fileupload')
//Tempfiles uploaderz
app.use(fileUpload({useTempFiles:true}))

// cookies
const cookieparser = require('cookie-parser')
app.use(cookieparser())

//For api communication in React
const cors = require('cors')
app.use(cors())

connectdb()



//load routes

app.use('/api',web);

//localhost:4000/api

// Server creation
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});