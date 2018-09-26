

//array storeing all the pattern needed
var arr=["*","**","***","****","*****","******"];

//index that specified the index to be printed
var index=-1;

//flag if 1 then increase else decrease index
var increase=1;

//reference to stop setInterval
var ref;


function animate()
{
    ref=setInterval(function()
    {
    
                if(increase)
                {
                    index++;
                    if(index>5){
                        increase=0;
                        index=index-2;       //this is to decrease 6 to 4 not 5
                    }
                }
                else
                {
                    index--;
                    if(index<0)
                    {
                        increase=1;
                        index=index+2;      //this is to increase -1 to 1 not 0
                    }
                }
                //printing the pattern
                console.log(arr[index]);
    },100);
    return;
}



//stoping the animation
function animateStop(){
    clearInterval(ref);
}