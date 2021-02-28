# node express crud

create package.json
```
npm init -y
```

install express
```
npm install --save express
```

in `index.js` file
```javascript
import express from 'express';  // both are same (works with node 14.5 and above..)
const express = require('express'); // old version
```
To enable the first line of code for above we have to make changes in package.json as follows
```javascript
"type" : "module",
```

run server
```npm
npm start
```

install nodemon package to refresh the server on each save
```
npm install --save-dev nodemon
```

In `package.json` add under scripts. This is done to start application using nodemon.
```
"start": "nodemon index.js";
```

For modularity we create another folder where we would store all our routes
create a folder `routes/users.js` which has the following basic template.
```javascript
import express from 'express';

// Use the express.Router class to create modular, mountable route handlers
const router = express.Router();

// routes here
// eg: router.get(...)

// export the app `router` so that it can be imported in index.js
export default router;
``` 

Now import the exported `router` app to `index.js` as follows
```javascript
import router from './routes/users.js';

app.use("/people", router);
```

now 
```javascript
router.post('/', (req, res) => {
    // when making post request, we have access to req.body
    user_list.push(req.body);  // user_list is list of dictoriay contianing all users
})
```

---


### Next step: Setting up mongo db database

npm install mongoose
```javascript
import mongoose from 'mongoose';
```


```javascript
const CONNECTION_URL = "mongodb+srv://<username>:<password>@cluster0.frghl.mongodb.net/<data_basename>?retryWrites=true&w=majority";
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))) // what to do when we connection is made
  .catch((error) => console.log(`${error} did not connect`)); // what if it goes wrong
mongoose.set('useFindAndModify', false);
```

We now create schema for our database. Since this is basic crud, we want username, email.
we do so by creating `user_model.js` file inside `models` folder in root directory.

```javascript
import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: { // required field
        type: String,
        required: true
    },
    createdAt: { 
        type: Date,
        default: new Date(),
    },
})

var user_model = mongoose.model('user_model', postSchema);

export default user_model;
```

After exporting the model, we now import in our `functions.js` file. 















Error messages
```error
import { Mongoose } from 'mongoose';
         ^^^^^^^^
SyntaxError: Named export 'Mongoose' not found. The requested module 'mongoose' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from 'mongoose';
const { Mongoose } = pkg;
```
