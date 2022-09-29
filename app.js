const express = require('express')
const app = express()

const path = require('path');
const nodemailer=require("nodemailer");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const encrypt=require("mongoose-encryption")
const cors = require('cors');
const { redirect } = require('express/lib/response');
const port = 3000


var mailtype;
var usermail;
var user_pswd;
var user_sub;
var user_cont;
var val_mail=[];
// We are using our packages here
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: true})); 
app.use(cors())

////////////////////////////////////// CONNECT TO DATABASE ROBO 3T/////////////////
//////////////////////////////////////////////////////////////////////////////////
mongoose.connect("mongodb://localhost:27017/loginDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});
const secret="TheNewCipher#1234566778789898u9899797bcbd8ue8837#E#Dx4$#xd574X&$^&C%*%DX^%$$4$%564%$687^cGCG^TC^%%c"
userSchema.plugin(encrypt,{secret:secret,encryptedFields:["password"]});
const User = new mongoose.model("User", userSchema);
/////////////////////////////////// POSTING OF STARTING LOGIN PAGE /////////////////
//////////////////////////////////////////////////////////////////////////////////
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/login.html'));
});

app.post('upload',(req,res)=>{
    res.redirect(path.join(__dirname+'/upload.html'));
})
app.get('/content',(req,res)=>{
     console.log(req.body)
    res.sendFile(path.join(__dirname+'/content.html'));
})
app.get('/result',(req,res)=>{
     console.log(req.body)
  res.sendFile(path.join(__dirname+'/result.html'));
})
// document.getElementById('engage').addEventListener('click',()=>{
//   res.sendFile(path.join(__dirname+'/upload.html'));
// })
/////////////////////////// POSTING TO MAIN PAGE WHEN NEW USER REGISTERS ////////////////////
/////////////////////////////////////////////////////////////////////////////
app.post('/main',function(req,res){
  // res.sendFile(path.join(__dirname+'/main.html'))
  const newUser =  new User({
    email: req.body.username,
    password:req.body.password
  });
  newUser.save(function(err){
    if (err) {
      console.log(err);
      
    } else {
      console.log(req.body.username);
      // console.log(hash)
      res.sendFile(path.join(__dirname+'/main.html'));
    }
  });
  });

   /////////////////////////// POSTING TO MAIN PAGE WHEN ALREADY REGISTERED USER LOGS IN ///////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////// 
  app.post('/signup',function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body)
  
    User.findOne({email: username}, function(err, foundUser){
      if (err) {
        console.log(err);
        alert('Wrong Password')
        res.sendFile(path.join(__dirname+'/login.html'));
      } else {
        if (foundUser) {
         if(foundUser.password === password){
          res.sendFile(path.join(__dirname+'/main.html'));
         }
         else{
         
          res.sendFile(path.join(__dirname+'/login.html'));
         }
        }
      }
    });
  });
app.get("/upload",function(req,res){
  res.sendFile(path.join(__dirname+'/upload.html'));
})
app.get("/about",function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
})

app.get("/faq",function(req,res){
  res.sendFile(path.join(__dirname+'/faq.html'));
})
app.get("/privacy",function(req,res){
  res.sendFile(path.join(__dirname+'/privacy.html'));
})

//You can use this to check if your server is working
//Route that handles login logic
app.post('/send', (req, res) =>{
     console.log(req.body) 
    mailtype=req.body.mail
    usermail=req.body.user
   user_pswd=req.body.password
   user_sub=req.body.subject
   user_cont=req.body.content
   attch=req.body.attch
    val_mail=(req.body.crrt).split("\n");
console.log(mailtype,usermail,user_pswd) 
//////////////////////////////////////////////////////////// secondary functions//////////////////////////////////////
//to transport mail function after the result part
var transporter=nodemailer.createTransport({
    service:mailtype,
    auth: {
        user:usermail,
        pass:user_pswd
    }
  });
  var mailOptions={
    from:usermail,
    to:val_mail,
    subject: user_sub,
    text:user_cont
  };  
  //primary function for mail sending 
transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error);
      //  alert("Email not sent due to Technicle issue  please Confirm your email and password ,If its not the case check your internet connection");
        res.sendFile(path.join(__dirname+'/main.html'));
    }
    else{
        console.log("Email sent :"+ info.response);
        res.sendFile(path.join(__dirname+'/congrats.html'));
    }
  });
})
//Start your server on a specified port
app.listen(port, ()=>{
    console.log(`Server is runing on port ${port}`)
})
