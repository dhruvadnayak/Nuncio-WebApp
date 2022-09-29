// var img=[];
var att=[];
var cnt=0
var im=0;
var fl=0;
var temp=[];
function getelement(event) {
if(event.target.files.length > 0) {
   console.log(event.target.files[0]);
    cnt++;
    im++;
    fl++;
    document.getElementById('imfc').innerHTML=im;
     document.getElementById('pdfc').innerHTML=fl;
     temp.push(event.target.files[0].name);

     var src = event.target.files[0].name;
    // att.push(src);
    sessionStorage.setItem(0,cnt);
    sessionStorage.setItem(cnt,src);
}
}
document.getElementById("resultpg").addEventListener('click',function(){
      localStorage.setItem("hi","hi");
    var subcont = document.getElementById('sub');
    var concont =document.getElementById('cont');
  console.log(subcont.value);
sessionStorage.setItem("sub", subcont.value);  
sessionStorage.setItem("cont", concont.value);  

    console.log(att)
    location.href="Result.HTML";
  })
