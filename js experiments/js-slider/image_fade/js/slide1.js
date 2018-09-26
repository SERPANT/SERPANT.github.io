var index=0;
var images=[];
var dec=0.013;
var ref;
var test=0;

function switchimages()
{
  var  container= document.getElementsByClassName("container")[0];
   images=container.getElementsByTagName("img");

 
  images[0].style.opacity=1;
  next=(index+1)%images.length;

  ref= setInterval(function()
  {
   
        images[index].style.opacity=images[index].style.opacity-dec;
       
       
        test=test+dec;
   
        images[next].style.opacity=test;
   

    if(images[next].style.opacity>=1){
        index=next;
        next=(index+1)%images.length;
        test=0;
        
    }
    

  },100)
}


function stop()
{
    clearInterval(ref);
}

switchimages();