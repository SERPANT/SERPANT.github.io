var div=document.createElement('div');
div.style.width="500px";
div.style.height="300px";

div.style.background="blue";
div.style.position="relative";
document.body.appendChild(div);

var child=document.createElement('div');
child.style.background="red";
child.style.width="50px";
child.style.height="50px";
child.style.position="relative";
child.style.left="250px";
child.style.top="0px";
child.style.borderRadius="50%";

div.appendChild(child);


var x=0;
var flag=0;
var inc=4;
var rel;
function start(){
rel=setInterval(function(){
  child.style.top=x+"px";
  if(x<250 && flag==0){
    x=x+inc;
    
  }
  else{
     x=x-inc;
     flag=1;
     if(x<0){
         flag=0;
     }
  }
  
},20)
}

function stop()
{
    clearInterval(rel);
}

var arr=[];

for(var i=0;i<10;i++)
{
    var box = {
    x: Math.floor(Math.random() * 450),
    y: Math.floor(Math.random() * 300),
    width: "10px",
    height: "10px",
    radius:"50%",
    element: document.createElement('div')
        };

    //var boxes=document.createElement('div');
        box.element.style.background="lightgreen";
        box.element.style.width=box.width;
        box.element.style.height=box.height;
        box.element.style.position="absolute";
        box.element.style.left=box.x+"px";   
        box.element.style.top=box.y+"px"; 
        box.element.style.borderRadius=box.radius;
        box.element.style.transition = '500ms';
        arr.push(box);
    
           
        div.appendChild(box.element);

}

rel_green=setInterval(function(){
   for(var i=0;i<arr.length;i++){
       arr[i].x=Math.floor(Math.random() * 450);
        arr[i].y=Math.floor(Math.random() * 300)
        arr[i].element.style.left=arr[i].x+"px";   
        arr[i].element.style.top=arr[i].y+"px"; 
   }
  
},500)

function stop_green(){
clearInterval(rel_green);
}





