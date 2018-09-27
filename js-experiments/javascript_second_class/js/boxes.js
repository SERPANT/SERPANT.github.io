var green=document.getElementById("green");   //this cannot have getelementbyid but has getelementByTag
console.log(green);


var p=green.getElementsByTagName("p");
console.log(p);

var red=document.getElementsByClassName("red");
console.log(red);
console.log(red[0]);


var tag=document.getElementsByTagName("div")
console.log(tag);




for(var i=0; i<red.length;i++){
    red[i].style.background="red";
}



div=document.createElement("div");

div.style.height="400px";
div.style.width="400px";
div.style.background="gold"


//this is direct
document.body.appendChild(div);

p=document.createElement("p");
p.style.width="100px"
p.style.height="50px"
p.style.background="purple"


div.appendChild(p);


function remove()
{
    div.removeChild(p);
}


var green_child=green.childNodes;

console.log(green_child);





green.onclick=function()
{   
      //green.style.background="lightgreen"
    if(green.classList.contains('enable')){
     
      green.classList.remove("enable");
    }
    else{
      
        green.classList.add("enable");
    }
 }
