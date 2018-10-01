var game;
var maxw=45;
var maxh=45;
var minw=25;
var minh=25;
var ants=[];
var widthRandom=1500;
var heightRandom=710;
const animationFrame=100;




//this is like main and the starting point  of the game
function startPage() { gameIntroPage(); }

//the first page of the game to start the game
function gameIntroPage(){
    //front ant gif
    frontAntImage();
    //renders game start button
    GameStartButton();   
}



function frontAntImage()
{
    frontImage=document.createElement('div');
    frontImage.style.width='100%';
    frontImage.style.height='500px';
    frontImage.className='ant';
    document.body.appendChild(frontImage);
}



function GameStartButton()
{
    startButton=document.createElement('button');
    startButton.width='100%';
    startButton.innerHTML='START GAME';
    startButton.className='start-button';
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
    var FPS=30;
    var score=0;
    var scoreTitle;
    var refGameLoop; 
    var antCount=50;
    var animationCounter=animationFrame;
    


    //the initialize function of the game : this is where the game starts to run
    this.init=function()
    {
        this.addComponent();
        refGameLoop=setInterval(gameLoop,1000/FPS);
    }


    //the game loop of the game
    var gameLoop=function()
    {
        if(score===antCount)  {  gameWon();  }

        //update the next target position for the ant only after the animation is completed 
        if(animationCounter===animationFrame)
        {
            update();
            animationCounter=0;
        }
        
        render();
        animationCounter++;
    }

    function gameWon()
    {
        this.stopGame();
        document.body.innerHTML='';

    }


    this.stopGame=function() { clearInterval(refGameLoop);}



    this.addComponent=function(){
        createContainer();
        createAnts(antCount);
    }


    //this sets up the gamecontainer on the screen 
    function createContainer(){

        //creating the main div container
        GameContainer=document.createElement('div');
        GameContainer.className='game-container';
        document.body.appendChild(GameContainer);

        scoreBoard=createScoreBoard();
        restart=createRestartButton();
    
        GameContainer.appendChild(scoreBoard);
        GameContainer.appendChild(restart);

    }

    //creating restart button
    function createRestartButton()
    {
        Restart=document.createElement('div');
        Restart.className='restart';
        Restart.style.position='absolute';
        Restart.onclick=
        function()
        {
            game.stopGame();
            document.body.innerHTML='';
            startPage();
        }

        // restartTitle=document.createElement("H2");
        // restartTitle.style.position="Restart";
        // restartTitle.style.color="white"
        // restartTitle.innerHTML="RESTART";
        // Restart.appendChild(restartTitle);

        //restartImage=document.createElement("img");
       // restartImage.setAttribute("src","restart.jpg");
        
       // Restart.appendChild(restartImage);

        return Restart;
    }




    //creating score board
    function createScoreBoard()
    {
        //score board
        Score=document.createElement('div');
        Score.className='score-board';
        Score.style.position='absolute';


        // h1 text on score board
        scoreTitle=document.createElement('H1');
       // scoreTitle.style.position="absolute";
        scoreTitle.style.color='white'
        scoreTitle.innerHTML='Score -'+score;
        Score.appendChild(scoreTitle);

        return Score;
    }


    //used to re-render the score title
    function updateScore(){ scoreTitle.innerHTML='Score -'+score; }



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
                        }, 1000);

                  
                //   ants.splice(a.id,1);     
                if(antObject.element.className!='dead')                 //must be corrected as evey id is changed
                  { score++;}
                  antObject.element.className='dead';
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
            if(ants[i].element.className!=='dead')
            {
                ants[i].newPostion();
            }
        }
    }


    //render is called every 30ms and animates the movement of the ants
    function render(){
       
        for(var i=0;i<ants.length;i++)
        {
            if(ants[i].element.className!=='dead')
            {
                var collide=ants[i].collitionDetection();

                if(collide===0){
                    ants[i].updatePosition();  
                }
              
                updateScore();
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
    this.x;
    this.y;
    this.id=index;
    this.element;
    this.deltax=0;   //for movement in x direction in animation
    this.deltay=0;   //for movement in y direction in animation
    this.targetX=0;
    this.targetY=0;  
    this.width=Math.floor(Math.random()*maxw)+minw;
   // this.height=Math.floor(Math.random()*maxh)+minh;
    this.height=this.width;
    const hexCode= [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];  //hex code for ramdom color generator



    this.create=function()
     {  
        ant= document.createElement('div');
        ant.style.width=this.width+'px';
        ant.style.height=this.height+'px';
        ant.style.background=getHexColor();
        ant.className='alive';
        ant.style.position='absolute';
        
        this.x=random(0,widthRandom-this.width-5);
        this.y=random(0,heightRandom-this.height-5);

        while(this.collitionDetection()==1)
        {   
            this.x=random(0,widthRandom-this.width-5);
            this.y=random(0,heightRandom-this.height-5);
        }

        ant.style.left=this.x+'px';
        ant.style.top=this.y+'px';

        var number=random(0,1000);
        if(number%2===0)
        {
            ant.classList.add('circle');
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
        var newx=random(0,widthRandom-1);
        var newy=random(0,heightRandom-1);

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
       // this.element.style.transform=" rotate(0.2deg)";
        
        if(nx+this.width>=widthRandom || nx<0){
  
            this.deltax=this.deltax*(-1);
            nx=this.x+this.deltax;     
        }


        if(ny+this.height>=heightRandom || ny<0)
        {
           
            this.deltay=this.deltay*(-1);
            ny=this.y+this.deltay;
        }
        this.element.style.left=nx+'px';
        this.element.style.top=ny+'px';
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


    this.collitionDetection=function()
    {
        var collisionYes=0;
        for(var i=0;i<ants.length;i++)
        {
            if(ants[i].id!=this.id)
            {
       
                var rec1w=ants[i].width;
                var rec1h=ants[i].height;
                var rec1x=ants[i].x;
                var rec1y=ants[i].y;

                var rec2w=this.width;
                var rec2h=this.height;
                var rec2x=this.x+this.deltax;
                var rec2y=this.y+this.deltay;
                
                if (rec1x < rec2x + rec2w && rec1x + rec1w > rec2x && rec1y < rec2y + rec2h  && rec1h +rec1y > rec2y) 
                { 
                     this.changeDirection();
                     collisionYes=1;
                     
                 }
                 
            }
           
        }

        return collisionYes;
    }
}

startPage();  //used to start the game


