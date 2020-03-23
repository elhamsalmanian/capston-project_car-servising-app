//holds express application

//import express
const express = require('express');
const bodyParser = require('body-parser');
//importing mongoose
const mongoose = require("mongoose");

//connecting to mongoDB databae
//returns a promise
mongoose.connect("mongodb+srv://max:SdHi9lnfEIKSNmXe@cluster0-9wnr1.mongodb.net/test?retryWrites=true&w=majority",
  {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected Successfully')
  })
  .catch(() => {
    console.log('Connection Failed!')
  });


//importing post model from mongoose
const Post =require('./models/post');

//creating express app
//can use this as an express appe now (chain of middlewares we can do something wi
//a request)
const app = express();

//admin pass: SdHi9lnfEIKSNmXe
//package to connect to database

//parses json data
app.use(bodyParser.json());

// npm install --save body-parser

//cors middleware always goes in the server side
//has to run before any request or ß
app.use((req, res,next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept")
  // allows which http verbs we can use
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    firstName: req.body.firstName,
    email: req.body.email,
    address: req.body.address,
    vin: req.body.vin,
    year: req.body.year,
    model: req.body.model,
    plate: req.body.plate,
    mileage: req.body.mileage

  });
  // mongooseDB has a build in save function
  // (build-in query with the post model)
  post.save().then(createdPost => {
      res.status(201).json({
      message: "Post added successfully!",
      postId: createdPost._id
    });
  });
});



//creates a middleware you can use
app.get('/api/posts',(req, res, next) => {

  //const posts = [
  //  { id: 'fadf12421l',
  //    title: 'first server side-post',
  //    content: 'This is coming from the serve'
  //  },
  //  { id: 'ksajfaj132',
  //  title: 'Second server side-post',
  //  content: 'This is coming from the serve'
  //  }
  //];


  // fetching data from the database
  // find() returns all entries
  Post.find()
      .then((documents) => {
        res.status(200).json({
          message: 'Posts fetched successfully!',
          posts: documents
      });
  });
});
//return json data

// deleting post

app.delete("/api/posts/:id", (req, res, next) => {

  Post.deleteOne({ _id: req.params.id })
    .then(result => {
      console.log(result);
      res.status(200).json({message: 'Deleted successfully'});
    });
})

//export express application
module.exports = app;

