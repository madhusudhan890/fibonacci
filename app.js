require("dotenv").config();
const express = require("express");
const ejslint = require("ejs");
const bodyparser = require ("body-parser");
const mongoose = require("mongoose");
const async = require("async");
const app = express();

app.set("view engine","ejs");

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/loginDb");

const list = [];

const secretSchema = new mongoose.Schema ({
  userName:String,
  password:String,
});


const SignIn = mongoose.model("loginDetails",secretSchema);

app.get("/",function(req,res){
  res.render("login");
    list=[];
});

app.get("/login", function(req, res) {
        res.render("login");
});

app.get("/numbers",function(req,res){
  res.render("numbers")});
app.get("/result",function(req,res){
  res.render("result",{num:list})
});

app.post("/",function(req,res){

  var userName = req.body.userName;
  var password=req.body.password;

const signin = new SignIn({

  userName: userName,
  password:password

});
signin.save();
SignIn.find(function(err) {
  if (err) {
    console.log(err);
    res.redirect("/")
  } else {

    res.render("numbers")
  }
});
})


app.post("/numbers",function(req,res){
  var num1 = req.body.number1;
  var num2 = req.body.number2;
  list.push(num1,num2);
  res.redirect("/result")
});


app.listen(3000,function(){
  console.log("Server is running on Port 3000");
})
