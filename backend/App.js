// External Variables
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Require the dotenv to attach environment variables to the process object
require('dotenv').config();

// App Variables
const app = express();
const port = process.env.PORT || "8000";
const MongoURI = process.env.MONGO_URI;

// Middle-Ware
// Log Requests
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, res.path);
    next();
})
app.use(cors());

// Instructor Route
const instructorRoute = require('./Routes/Instructor');
const courseRoute = require('./Routes/Course');
const adminRoute = require('./Routes/Admin');
const corpTraineeRoute = require('./Routes/corpTrainee');

// Routes
app.use('/instructor', instructorRoute);
app.use('/course', courseRoute);
app.use('/admin', adminRoute);
app.use('/corpTrainee', corpTraineeRoute);

// Configurations
// MongoDB
mongoose.connect(MongoURI)
    .then(() => {
        console.log("MongoDB is now connected!")
            // Starting server
        app.listen(port, () => {
            console.log(`Listening to requests on http://localhost:${port}`);
        })
    })
    .catch(err => console.log(err));

app.get("/", async(req, res) => {
    res.status(200).send("You're good to go!");
});


var requestURL = 'https://api.exchangerate.host/convert?from=USD&to=EUR';
app.post("/curr", async (req, res) => {
    const response = await fetch(requestURL).then(res => res.json());
    console.log(response);
});