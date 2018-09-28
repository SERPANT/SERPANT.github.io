
var game;
const animationFrame=100;

//this is like main and the starting point  of the game
function startPage()
{
    gameIntroPage();
}

//the first page of the game to start the game
function gameIntroPage(){

    frontImage=document.createElement("div");
    frontImage.style.width="100%";
    frontImage.style.height="500px";
    frontImage.className="ant";
    document.body.appendChild(frontImage);


    startButton=document.createElement("button");
    startButton.width="100%";
    startButton.innerHTML="START GAME";
    startButton.className="start-button";
    document.body.appendChild(startButton);

    //starting the game on button click
    startButton.onclick=function(){
        document.body.removeChild(startButton);
        document.body.removeChild(frontImage);
        game=new Game();
        game.init();
    }
}


//the game object
function Game()
{
    var refGameLoop;
    var ants=[];
    var score=0;
    var animationCounter=animationFrame;
    var scoreTitle;
    var antCount=40;
    var FPS=30;

    //the initialize function of the game : this is where the game starts to run
    this.init=function()
    {
        this.addComponent();
        refGameLoop=setInterval(gameLoop,1000/FPS);
    }


    //the game loop of the game
    var gameLoop=function()
    {
        //update the next target position for the ant only after the animation is completed 
        if(animationCounter===animationFrame){
            update();
            animationCounter=0;
        }
        
        render();
        animationCounter++;
    }


    this.stopGame=function() { clearInterval(refGameLoop);}




    this.addComponent=function(){
        createContainer();
        createAnts(antCount);
    }

    //this sets up the gamecontainer on the screen 
    function createContainer(){

        //creating the main div container
        GameContainer=document.createElement("div");
        GameContainer.className="game-container";
        document.body.appendChild(GameContainer);

        //score board
        Score=document.createElement("div");
        Score.className="score-board";
        Score.style.position="relative";


        // h1 text on score board
        scoreTitle=document.createElement("H1");
        scoreTitle.style.position="absolute";
        scoreTitle.style.color="white"
        scoreTitle.innerHTML="Score -"+score;
        Score.appendChild(scoreTitle);

        GameContainer.appendChild(Score);

    }


    //used to re-render the score title
    function updateScore(){ scoreTitle.innerHTML="Score -"+score; }


    /**
     * 
     * @param {*} number "the number of ants to be created"
     */
    function createAnts(number){
        for(var i=0;i<number;i++)
        {
            var ant=new Ant(i);
            ant.create();
        
            ant.element.onclick=(function(antObject)
                {
                    return function(){
                        setTimeout(() => {
                        GameContainer.removeChild(antObject.element);  
                        }, 1500);

                   antObject.element.className="dead";
                //   ants.splice(a.id,1);                      //must be corrected as evey id is changed
                   score++;
                }
            })(ant);


            GameContainer.appendChild(ant.element);
            ants.push(ant);
        }      
    }


    //the update game function : this is used to update the next position of the ant
    function update()
    {
        for(var i=0;i<ants.length;i++)
        {
            if(ants[i].element.className!=="dead")
            {
                ants[i].newPostion();
            }
        }
    }


    //render is called every 30ms and animates the movement of the ants
    function render(){
       
        for(var i=0;i<ants.length;i++)
        {
            if(ants[i].element.className!=="dead")
            {
                ants[i].updatePosition();
                collitionDetection(ants[i]);
                updateScore();
            }
        }

    }


    /**
     * 
     * @param {*} ant :this is the ant for which collition is checked
     */
    function collitionDetection(ant)
    {
        for(var i=0;i<ants.length;i++)
        {
            if(ants[i].id!=ant.id)
            {
              
                if (ants[i].x < ant.x + ant.width && ants[i].x + ants[i].width > ant.x &&ants[i].y < ant.y + ant.height && ants[i].height +ants[i].y > ants.y) 
                {
                     ant.changeDirection();
                     console.log("here");
                 }
                 
            }
           
        }
    }
}

   

/**
 * this is the ant object function
 * @param {*} index : a unique identity to all the ants
 */
function Ant(index)
{
   
    this.id=index;
    this.element;
    this.deltax=0;   //for movement in x direction in animation
    this.deltay=0;   //for movement in y direction in animation
    this.targetX=0;
    this.targetY=0;
    this.color="red";
    this.x=random(0,1500);
    this.y=random(0,700);
    this.width=Math.floor(Math.random()*40)+20;
    this.height=Math.floor(Math.random()*40)+20;
    const hexCode= [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];  //hex code for ramdom color generator



    this.create=function()
     {
        ant= document.createElement("div");
        ant.style.width=this.width+"px";
        ant.style.height=this.height+"px";
        //ant.style.backgroundImage="url('images/bird.png')";
        //ant.style.backgroundRepeat= "no-repeat"
        ant.style.background=getHexColor();
        ant.className="alive";
        ant.style.position="absolute";
        ant.style.left=this.x+"px";
        ant.style.top=this.y+"px";

        var number=random(0,1000);
        if(number%2===0)
        {
            ant.classList.add("circle");
        }

        this.element=ant;
    }

    //random number generator
    function random(base,end)
    {
        return Math.floor(Math.random()*end)+base;
    }


    //computes new positon for the ant
    this.newPostion=function()
    {
        var newx=random(0,1500);
        var newy=random(0,700);

        this.deltax=(newx-this.x)/animationFrame;
        this.deltay=(newy-this.y)/animationFrame;

        this.targetX=newx;
        this.targetY=newy;   
    }

    //this is used for animation to update the position of ant by delta values
    this.updatePosition=function()
    {
        nx=this.x+this.deltax;
        ny=this.y+this.deltay;
        if(nx>1700 || nx<0){
            nx=nx*(-1);
        }
        if(ny>700 || ny<0)
        {
            ny=ny*(-1);
        }
        this.element.style.left=nx+"px";
        this.element.style.top=ny+"px";
        this.x=nx;
        this.y=ny;     
        //game.stopGame();
    }

    //changes the direction of ant
    this.changeDirection=function()
    {
        this.deltax=this.deltax*(-1);
        this.deltay=this.deltay*(-1);
    }

    function getHexColor()
            {
                var color='#'; 
                for(var i=0;i<6;i++)
                {
                    color=color+hexCode[Math.floor(Math.random()*16)];
                }
                
                return color;
            }
}

startPage();  //used to start the game


