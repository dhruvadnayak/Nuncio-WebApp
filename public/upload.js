


document.getElementById('btn_sub').addEventListener('click',function(){
    var m=document.getElementById("mailType").value;
    var u=document.getElementById("userId").value;
    var p=document.getElementById("paswd").value
 
    sessionStorage.setItem("service",m);
           sessionStorage.setItem("userId",u);
           sessionStorage.setItem("paswd",p);  
    console.log(sessionStorage.getItem("service")
    ,sessionStorage.getItem("userId"),
sessionStorage.getItem("paswd"))
})

