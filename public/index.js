

 const service=sessionStorage.getItem("service");
 const userId=sessionStorage.getItem("userId");
 const paswd=sessionStorage.getItem("paswd");
 const  subject=sessionStorage.getItem("sub");
   const content=sessionStorage.getItem("cont");
   var ml_cont;
   var msl;
 var wrong=[];
 var att=[]
 var data=[];
 var crrt=[];
document.addEventListener("DOMContentLoaded",function(){
   
  var n=sessionStorage.getItem(0);
 console.log(userId,service,paswd);
 var m=document.getElementById('mail');
var u=document.getElementById('usr');
var p=document.getElementById('pwd');
var s=document.getElementById('sub');
var c=document.getElementById('cont');

m.value=service;
u.value=userId;
p.value=paswd;
s.value=subject;
c.value=content;
 
  for(var i=1;i<=n;i++){
      att.push(sessionStorage.getItem(i))
  }
   console.log(att);
  var str="";
    var strt=document.getElementById('adLoop');
    console.log(att[0]);

    

  for(var i=0;i<att.length;i++){
  
          str+=`<div>`
      str+=`<p>${att[i]}</p>`
      str+=`</div>` 
  }
  if(att.length===0){
    str+=`<div>`
    str+=`<p>No Attachments found</p>`
    str+=`</div>`
  }
  // `<td>${name}</td>`
  strt.innerHTML=str;

  //starting of mail validation
  


})
function readImage(input){
  ml_cont=document.getElementById('crt_mails');
  // console.log(input)
if (input.files && input.files[0]) {
let reader = new FileReader();
      reader.readAsBinaryString(input.files[0]);
reader.onload = function (e) {
console.log(e);
obj_csv.size = e.total;
obj_csv.dataFile = e.target.result
               data=obj_csv.dataFile;
          // console.log(data); 
         
          var text=data;
          let arr=text.split("\n");
          for(var i=0;i<arr.length;i++){
              validateEmail(arr[i]);
          }
          var show=document.getElementById('wrng_cnt');
          var h3=`  <h3 style="font-family: 'Poppins', sans-serif;">oops!!!,You have ${wrong.length} currupt Emails</h3>` 
          show.innerHTML=h3;  
           ml_cont.value=msl
          var ntdne=document.getElementById('btn_cancle');
        
         console.log(document.getElementById("mailType").value);    
}
}
}

var obj_csv = {
    size:0,
    dataFile:[]
};
 
function validateEmail(email){
  var emailreg= /^([a-zA-Z0-9_\.\-])+\@gmail.com/;
  if(!email.match(emailreg)){
    wrong.push(email);
  }
  else{
    crrt.push(email)
    msl+=email
  }
};


///////////////////////////////////////////////////////


