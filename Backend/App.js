// External variables
const express = require("express");
const mongoose = require('mongoose');

// Require the dotenv to attach environment variables to the process object
require('dotenv').config();

//App variables
const app = express();
const port = process.env.PORT || "8000";
const MongoURI = process.env.MONGO_URI;




// Middle-ware
// Log requests
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, res.path);
    next();
})


// instructor route
const instructorRoute = require('./Routes/instructor');


// routes
app.use('/instructor', instructorRoute);

// configurations
// Mongo DB
mongoose.connect(MongoURI)
    .then(() => {
        console.log("MongoDB is now connected!")
            // Starting server
        app.listen(port, () => {
            console.log(`Listening to requests on http://localhost:${port}`);
        })
    })
    .catch(err => console.log(err));

app.get("/", async (req, res) => {
    res.status(200).send("You're good to go!");
});