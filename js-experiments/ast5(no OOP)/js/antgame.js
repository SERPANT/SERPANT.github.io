
const ANT=20;
var relGreen=[];
const hexCode= [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
var refAnimation=[];
var animationTIime=25;
//const antColor="red";
const backGround="black"
const GroundWidth="1000px";
const GroundHeight="600px";
const GroundWidthint=1000;
const GroundHeightint=600;
var playerScore=0;
var score;

function start()
{
    createBlueBox();
    createGreenBox();
    createScore();
}


function createScore()
{
    scoreContainer=document.createElement("div");
    scoreContainer.className="score-board";
    scoreTitle=document.createElement("H1");
    scoreTitle.innerHTML="Score";
    scoreContainer.appendChild(scoreTitle);

    score=document.createElement("span");
    score.innerHTML=playerScore+"";
    scoreContainer.appendChild(score);
    document.body.appendChild(scoreContainer);
}

function renderScore()
{
    score.innerHTML=playerScore+"";
}
function createBlueBox()
{
    blueBox=document.createElement("div");
    blueBox.style.width=GroundWidth;
    blueBox.style.height=GroundHeight;
    blueBox.style.background=backGround;
    blueBox.className="blue-box";
    document.body.appendChild(blueBox);
}

function createGreenBox()
{

        var div=document.getElementsByClassName("blue-box")[0];

        var arr=[];

        for(var i=0;i<ANT;i++)
        {

            var box = {
            id:i,
            counter:0,
            x: Math.floor(Math.random() * 450),
            y: Math.floor(Math.random() * 300),
            width: "20px",
            height: "20px",
            radius:"50%",
            redColor:Math.floor(Math.random*255),
            greenColor:Math.floor(Math.random*255),
            blueColor:Math.floor(Math.random*255),
            element: document.createElement('div')
                };

            //var boxes=document.createElement('div');
                box.element.style.background=gethex();
                box.element.style.width=box.width;
                box.element.style.height=box.height;
                box.element.style.position="absolute";
                box.element.style.left=box.x+"px";   
                box.element.style.top=box.y+"px"; 
                box.element.style.borderRadius=box.radius;
                box.element.style.borderColor="white";
                box.element.style.borderStyle="solid";
                box.element.onclick=(function(box){
                    return function()
                    {
                        div.removeChild(box.element);
                        playerScore++;
                        renderScore();
                    }
                })(box);

                arr.push(box);
                

                
                div.appendChild(box.element);

              startGreenBallID(i,box);

        }

         //   rel_green=setInterval(function(){
          //  for(var i=0;i<arr.length;i++){
          //      arr[i].x=Math.floor(Math.random() * 450);
          //          arr[i].y=Math.floor(Math.random() * 300)
         //           arr[i].element.style.left=arr[i].x+"px";   
         //           arr[i].element.style.top=arr[i].y+"px"; 
         //   }
            
           // },1000)
}

function gethex()
{
    var color='#';
    
   for(var i=0;i<6;i++)
   {
      color=color+hexCode[Math.floor(Math.random()*16)];
   }
 
   return color;
 
}


function stopGreenBalls()
{
    for(var i=0;i<ANT;i++)
    {
         clearInterval(relGreen[i]);
    }
}


function stopGreenBallID(index)
{
    clearInterval(relGreen[index]);
}


function startGreenBallID(index,box)
{
    relGreen[index] =setInterval(
        (function(box){
            return function(){
                newx=Math.floor(Math.random() * (GroundWidthint+20));
                newy=Math.floor(Math.random() * GroundHeightint);
               
                animate(box,newx,newy);
            }
        })(box),1000);
}

function animate(box,newx,newy)
{
    stopGreenBallID(box.id);
    var diffx=newx-box.x;
    var diffy=newy=box.y;
    var stepx=diffx/animationTIime;
    var stepy=diffy/animationTIime;
   
    refAnimation[box.id]=setInterval(
       ( function(newx,newy,stepx,stepy)
       {
          return function()
        {
            if(box.x+stepx>GroundWidthint-10 || box.x+stepx<0)
            {
                stepx=stepx*(-1);
            }

            if(box.y+stepy<0 || box.y+stepy>GroundHeightint-10)
            {
                stepy=stepy*(-1);
            }
            box.x=box.x+stepx;
            box.y=box.y+stepy;
            box.element.style.left=box.x+"px";
            box.element.style.top=box.y+"px";
            box.counter++;
            if(box.counter==animationTIime)
            {
                box.counter=0;
                stopanimation(box);
            }
        }
    })(newx,newy,stepx,stepy)
        ,animationTIime)

}


function stopanimation(box)
{
    stopanimatID(box.id);
    startGreenBallID(box.id,box);
}


function stopanimatID(index)
{
    clearInterval(refAnimation[index]);
}

start();

