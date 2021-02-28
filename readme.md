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

To create unique id for each user we install uuid package
```
npm install uuid
```

importing in `users.js`
```javascript
import { v4 as uuidv4 } from 'uuid';
    ...

    const userWithId = { ... user, id: uuidv4() }
    user_list.push(userWithId);
```

**POST** request
![](https://i.imgur.com/HiFuDc6.png)

Client view ( ***see id being generated***)
![](https://i.imgur.com/MM40yRs.png)


get detail user
```javascript
router.get('/:id', (req,res) => { // ":id" would be the key for req.params
    const { id } = req.params; // equivalent to req.params.id
    // find user with id equal to id passed in params
    const foundUser = user_list.find((user) => user.id === id); // array.find(function)
})
```
req.params gives access to end points passed as params
```javascript
 console.log(req.params);
```
output on accessing `http://localhost:5000/users/4d6c995c-8c68-4e61-8feb-88de8f26fda0`
```node
{ id: '4d6c995c-8c68-4e61-8feb-88de8f26fda0' }
```
and GET request by id
![](https://i.imgur.com/zuZCysk.png)


DELETE USER WITH ID
```javascript
router.delete('/:id', (req,res) => {
    const {id} = req.params; // get the id from req.params 
    user_list = user_list.filter((user)=> user.id !== id); // only keep users with id not equal to the id provided in req.params
    res.send(`user with id: ${id} is deleted`);
    console.log(`delete use with id ${id}`);
})
```
delete user using postman
![](https://i.imgur.com/gfHq9lY.png)


PATCH USER BY ID
```javascript
router.patch('/:id', (req, res) => {
    const {id} = req.params; // get the id from req.params 
    
    const {firstname, lastname, age} = req.body; // request sent from postman // do not send post data using form. does not recognise

    const user_update = user_list.find((user) => user.id === id); // get user with id
    console.log(user_update);
    if(firstname) user_update.firstname = firstname; // update firstname

    if(lastname) user_update.lastname = lastname; // update lastname
    
    if(age) user_update.age = age; // update age
    res.send(`user with id ${id} has been updated`);
})
```

PATCH USER WITH USER ID IN POSTMAN
![](https://i.imgur.com/bje9joZ.png)


Last thing is make `controllers` folder so that we seperate functions of CRUD into new file.

At final stage the directory should look like this

```tree
node_express_api
└──node_modules
└──controllers
    └── functions.js
    routes
    └── users.js
    ...
```

In `functions.js` we add CreateUser, UpdateUser, DeleteUser, GetUser, GetUserId function and export them

```javascript
//  creates unit id
import { v4 as uuidv4 } from 'uuid'; // make sure to move this import from users.js to functions.js 

//EXAMPLE
export const CreateUser = (req, res) => {
    // when making post request, we have access to req.body
    const id = uuidv4();
    const userWithId = { ... req.body, id: id }  // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    user_list.push(userWithId);
    console.log("post request sent");
    res.send(`post request sent for ${req.body.firstname} and id: ${id}`);
}
```

In `users.js` we replace the code block with these functions names.



---


### Setting up mongo db database

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


















```error
import { Mongoose } from 'mongoose';
         ^^^^^^^^
SyntaxError: Named export 'Mongoose' not found. The requested module 'mongoose' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from 'mongoose';
const { Mongoose } = pkg;
```
