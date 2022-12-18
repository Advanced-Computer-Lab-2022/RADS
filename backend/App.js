// External Variables
const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

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

// Importing Routes
const guestRoute = require('./Routes/Guest');
const instructorRoute = require('./Routes/Instructor');
const courseRoute = require('./Routes/Course');
const adminRoute = require('./Routes/Admin');
const corpTraineeRoute = require('./Routes/corpTrainee');
const traineeRoute = require('./Routes/Trainee');
const reportRoute = require('./Routes/Report');


// Using Routes
app.use('/', guestRoute);
app.use('/instructor', instructorRoute);
app.use('/course', courseRoute);
app.use('/admin', adminRoute);
app.use('/corptrainee', corpTraineeRoute);
app.use('/trainee', traineeRoute);
app.use('/report', reportRoute);

// Passport Middleware
app.use(passport.initialize());
// Passport Config
require('./Security/Passport')(passport);


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

module.exports = app;