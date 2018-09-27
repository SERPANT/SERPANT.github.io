var curr=0;
var ref;
var num;
var ul;
var animateRef;
var time=0;
var shifted=0;
var a=-1;
var k=1;
function start()
{
     ul=document.getElementsByTagName("ul")[0];
    var imgNo=ul.getElementsByTagName("img");
    num=imgNo.length;
    
    startSlide();
  // startSlider();
}


function startSlide(){
   
 //   diff=Math.abs( next-curr);
    ref=setInterval(function(){
       

       
        if(curr==0)
        {
           // shifted=0;
           a=-1;
          k=1;
        }
         else if(curr==3){
            a=1;
            k=-1;
        }
        curr=curr+k;
        

       // curr=(curr+1)%num;
          // ul.style.marginLeft=-(curr*800)+"px";
            
            animate(1);
        console.log("slider");
        },3000);
}


function stopSlide(){
    clearInterval(ref);
}


function animate(next)
{

    stopSlide();
    time=0;

    animateRef=setInterval(function(){
        //ul.style.marginLeft=-(curr*800)/250+"px";
         shifted=shifted+a*(next*800)/250;
        if(time===250)
        {
          animateOver();
          
        }  
        
        ul.style.marginLeft=shifted+"px";
        console.log("animate :" +shifted);
        time++;
    },1);
}


function stopanimate()
{
    clearInterval(animateRef);
}


function animateOver()
{
    stopanimate();
    startSlide();
}


