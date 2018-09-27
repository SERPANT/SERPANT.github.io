

function createbox(){
    var div=document.createElement("div");
    div.className="square";
    div.innerHTML="type deletebox() in console to remove";
    var body=document.getElementsByTagName("body")[0];
    body.appendChild(div);
 
}

function deletebox(){
    square=document.getElementsByClassName("square")[0];
    var body=document.getElementsByTagName("body")[0];
    body.removeChild(square)
    
}