var jsdom = require("jsdom");
var JSDOM = jsdom.JSDOM;
global.document=new JSDOM().window.document;

const nodemailer=require("nodemailer");
document.getElementById('btn_prcd').addEventListener('click',function(){

    transporter.sendMail(mailOptions,function(error,info){
      if(error){
          console.log(error);
      }
      else{
          console.log("Email sent :"+ info.response);
      }
    });
  })
  
  
  function getitems(){
    var cnt=[];
  for(var i=0;i<att.length;i++){
      cnt.push( {
            filename: att[i],
            path:__dirname+"/"+att[i],
            cid:att[i]
            })
  }
  return cnt;
  }
  function getcontent(){
    var str="";
    for(var i=0;i<att.length;i++){
  str+=`<img src="cid:${att[i]}"/></br>`
    }
    return str;
  }
 
  
  var transporter=nodemailer.createTransport({
    service:service,
    auth: {
        user:userId,
        pass:paswd
    }
  });
  var mailOptions={
    from:service,
    to:crrt,
    subject: subject,
    text:content,
    html: getcontent(),
     attachments:getitems()
  };  