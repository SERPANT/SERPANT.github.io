

var pattern="*******";
var index=1;
var increase=1;
var ref;

function animate()
{
    ref=setInterval(drawPattern,50);
}

function drawPattern()
{
    console.log(pattern.substring(0,index));
    
    if(increase)
    {
        index++;
        if(index>=pattern.length)
        {
            index=index-2;
            increase=0;
        }
    }
    else{
        index--;
        if(index<1)
        {
            index=index+2;
            increase=1;
        }
    }
   
}


function animationStop()
{
    clearInterval(ref);
}