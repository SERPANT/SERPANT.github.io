
var imageul;
var animateRef;
var numOfImages;
var refSlideTimer;
var stepsToTake=1;
var currentIndex=0;
var imageUlShifted=0;
var animationActive=0;  //tells if the animation is active or not
var directionToMove=-1;
var animationFramestime=0;





//this initializes all the necessary component in the html page
function componentInit()
{
    imageUl=document.getElementsByTagName("ul")[0];
    var imgNo=imageUl.getElementsByTagName("img");

    numOfImages=imgNo.length;

    initButton();
    createDotElement();
}




//initialize the left and right button
function initButton()
{
    var leftFunction=function(){

        //checking animation is active or not
        if(currentIndex>0 && animationActive===0){
            animationActive=1;
            currentIndex--;
            animate(1);
            
        }
    };

    var rightFunction=function(){

          //checking animation is active or not
        if(currentIndex<3 && animationActive===0){
            animationActive=1;
            currentIndex++;
            animate(-1);
            
        }
    };


    createButton('left','&#10094',leftFunction);
    createButton('right','&#10095',rightFunction);
}


/**
 * this creates a button
 * @param {classname} className this is the container that holds the button
 * @param {string} buttonContent this holds the value that is to be put in the button
 * @param {function} functionToExecute this is the function to be executed when the button is clicked
 */

function createButton(className,buttonContent,functionToExecute){
    var btncontainer= document.getElementsByClassName(className)[0];

    
    var btn = document.createElement('button');
    btn.setAttribute('content', 'test content');
    btn.setAttribute('class', 'btn');
    btn.innerHTML = buttonContent;

    btn.onclick=functionToExecute;

    btncontainer.appendChild(btn);
}






//creates teh dot element
function  createDotElement(){
    var boxContainer= document.getElementsByClassName("boxes")[0];
    var dotElement = document.createElement("div");
    dotElement.setAttribute("class", "dotElement");
    var dotArray = [];

    for(var i=0;i<numOfImages;i++)
    {
        var dotItem = document.createElement("span");
        //dotItem.setAttribute("class", "dot-item");
        dotItem.innerHTML = "&nbsp;";
        dotItem.onclick=(function(index){
            return function()
            {
                var steps=index-currentIndex;
                console.log(steps);
                currentIndex=index;
                if(steps>0)
                {
                    if(animationActive===0)
                    {
                        animationActive=1;   
                        animate(-1*steps);
                    }
                }
                else if(steps<0){
                    if(animationActive===0)
                    {
                        animationActive=1;
                        animate(-1*steps);
                    }
                }
            
            }
        })(i);
        dotArray.push(dotItem);
        dotElement.appendChild(dotItem);

    }

     boxContainer.appendChild(dotElement);
}




//start the slider
function sliderStart()
{
    startSlide();
}





function startSlide()
{
 //   diff=Math.abs( next-curr);
    refSlideTimer=setInterval(function(){
       
       if(animationActive===0) 
       {
           animationActive=1
        if(currentIndex==0)
        {
           // shifted=0;
           directionToMove=-1;
           stepsToTake=1;
        }
         else if(currentIndex==numOfImages-1){
            directionToMove=1;
            stepsToTake=-1;
        }
        currentIndex=currentIndex+stepsToTake;   
         
            animate(directionToMove);
        }},3000);
}

//stops the slider
function stopSlide(){
    clearInterval(refSlideTimer);
}




/**
 * this animates the transition from current index to next index
 * @param {int} next index that is to be loaded next in the image
 */
function animate(nextIndex)
{
    
    stopSlide();
    animationFramestime=0;

    animateRef=setInterval(function(){
        //ul.style.marginLeft=-(curr*800)/250+"px";
        imageUlShifted=imageUlShifted+(nextIndex*800)/250;
        if(animationFramestime===250)
        {
          animateOver();
        }  
        if(imageUlShifted>=(numOfImages*-800) || imageUlShifted<=0)
        {
             imageUl.style.marginLeft=imageUlShifted+"px";
        }
        animationFramestime++;
    },1);
}



//stops the animation transition
function stopanimate()
{
    clearInterval(animateRef);
    animationActive=0;
}



//called when animation is required to be stopped
function animateOver()
{
    stopanimate();
    startSlide();
    
}

//initialze component
componentInit();

//start the whole process
sliderStart();
