import express from 'express';
import bodyParser from 'body-parser';  // incoming post request parse it to read on client

import routers from "./routes/users.js";
import mongoose from 'mongoose';

const app = express(); // initialise the app
const PORT = process.env.PORT || 5000;

//  specify middleware
app.use(bodyParser.json()); // says we are going to user json
app.use(bodyParser.urlencoded({  extended: true }));
//  sends us to `./routes/users.js` for routes
app.use("/users", routers);

// creating route   
app.get('/say', (req, res) => {
    console.log('[TEST]');

    res.send('hello from homepage');
})

const CONNECTION_URL = "mongodb+srv://type_script:type_script@cluster0.frghl.mongodb.net/Project0?retryWrites=true&w=majority";

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);



