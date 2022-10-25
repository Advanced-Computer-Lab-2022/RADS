// External Variables
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

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

// Routes
app.use('/Instructor', instructorRoute);

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