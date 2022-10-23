// External variables
const express = require("express");
const mongoose = require('mongoose');
const MongoURI = 'mongodb+srv://database:1234@cluster0.insh6i0.mongodb.net/?retryWrites=true&w=majority' ;


//App variables
const app = express();
const port = process.env.PORT || "8000";
// #Importing the userController
const user = require('./Models/User');


// configurations
// Mongo DB
mongoose.connect(MongoURI)
.then(()=>{
  console.log("MongoDB is now connected!")
// Starting server
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  })
})
.catch(err => console.log(err));
/*
                                                    Start of your code
*/
app.get("/home", async (req, res) => {
    res.status(200).send("OKAY");
});
app.get('/users', async (req, res) => {
  const users = await user.find({});
  res.status(200).json(users);
});


// #Routing to userController here


/*
                                                    End of your code
*/