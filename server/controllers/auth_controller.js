const users = require('../models/users');
// create a global id variable and use this variable to assign ids to newly registered users
let id =1;

// this controller logs users in, registers users, signs users out, and retrieves user info

 module.exports ={
    // here, export an object with a login, register, signout, and getUser method
    login:(req, res, next)=>{
        const{session} = req;
        // look on the request body for a username and password
        const{username, password}=req.body;
        // check to see if a user from the users array matches that user/pass combination
       const user = users.find(user=>user.username===username && user.password===password);
       if(user){
        // if the method finds a user, update the value of username to the user's username on the request session's user object
            session.user.username=user.username
            res.status(200).send(session.user)
       }else{
            res.status(500).send('Unauthorized');   
       }
    }, 
    register:(req, res, next)=>{
        const {session}=req;
        // the method should look on the request body for a username and password
        const{username, password}=req.body;
        // the method should push to the users array
        users.push({id, username, password});
        // the method should increment the value of the global id variable
        id++;   
        // the method should update the value of username on the request session's user object
        session.user.username=username;
        // the method should send a status of 200 with the request session's user object
        res.status(200).send(session.user)
    },

    signout:(req, res, next)=>{
        // signout should destroy the session using req.session.destroy()
        const{session}=req;
        session.destroy();
        // the method should return the req.session object
        res.status(200).send(req.session)
    },
    getUser:(req, res, next)=>{
        const{session}=req;
        // getUser should simply send a status of 200 along with the request session's user object
        res.status(200).send(session.user)
    }
 }
