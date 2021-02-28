

//  creates unit id
import { v4 as uuidv4 } from 'uuid';

let user_list = []; // we leave it empty to add users by post request. `let` is used because we change the user_list at delete

export const GetUser = (req, res) => {
    console.log("in routes/users.js");
    res.send(user_list);
}

export const CreateUser = (req, res) => {
    // when making post request, we have access to req.body
    const id = uuidv4();
    const userWithId = { ... req.body, id: id }  // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    user_list.push(userWithId);
    console.log("post request sent");
    res.send(`post request sent for ${req.body.firstname} and id: ${id}`);
}

export const GetUserId = (req,res) => {
    
    const { id } = req.params; // equivalent to req.params.id
    // find user with id equal to id passed in params
    const foundUser = user_list.find((user) => user.id === id); // array.find(function)
    res.send(`got user with id ${id}`);
    console.log(`get use with id ${id}`);
}

export const DeleteUser = (req,res) => {
    const {id} = req.params; // get the id from req.params 
    user_list = user_list.filter((user)=> user.id !== id); // only keep users with id not equal to the id provided in req.params
    res.send(`user with id: ${id} is deleted`);
    console.log(`delete use with id ${id}`);
}

export const UpdateUser = (req, res) => {
    const {id} = req.params; // get the id from req.params 
    
    const {firstname, lastname, age} = req.body; // request sent from postman // do not send post data using form. does not recognise

    const user_update = user_list.find((user) => user.id === id); // get user with id
    console.log(user_update);
    if(firstname){
        user_update.firstname = firstname; // update firstname
    }
    
    if(lastname){
        user_update.lastname = lastname; // update lastname
    }
    
    if(age){
        user_update.age = age; // update age
    }
    console.log(firstname, lastname, age);
    res.send(`user with id ${id} has been updated`);
}