//the bullet array
var bulletsArray=[];



//the main Game Class
/**
 * 
 * @param {*} passedCanvas : this is the canvas from the document that is passed down to game object
 */
function Game(passedCanvas)
{
    //variable initalization
    var bat;
    var caveBg;
    var canvas;
    var score=0;
    var context;
    var rock=[];   
    var gameOverAudioPlayed=0;
    var pos=[-908,0,908];
    var gameOver=new Audio();
    var dashSound=new Audio();
    var crashSound=new Audio(); 
    var bulletSound1=new Audio();
    var rockImages=['images/rock3.png','images/rock4.png','images/rock2.png'];
   
    this.init=function()
    {
        //context setup
        canvas=passedCanvas;
        context = canvas.getContext('2d');

        //player creating 
        bat=new Player();
        //adding even listener
        document.addEventListener('keydown',updateDeltaMove);

        //background
        caveBg=new Image();
        caveBg.src='images/background4.jpg';
       
        //endmy objects
        rock[0]=new Rock(200,-20,80,80,5);
        rock[1]=new Rock(600,-20,150,97,4,'images/rock3.png');
        rock[2]=new Rock(1050,-20,150,150,7,'images/rock4.png');

        //sounds
        bulletSound1.src='audio/fireball.mp3';
        crashSound.src='audio/crash.ogg';
        gameOver.src='audio/GameOver.MP3';
        dashSound.src='audio/swish.mp3';
     
        backgroundSound.play()
        gameLoop();
    }



    function updateDeltaMove(event)
    {
        if(event.code==='ArrowRight')
        {
          bat.stepRight();
        }
         if (event.code==='ArrowLeft')
        {
          bat.stepLeft();   
        }

        if(event.code=='Space')
        {
          //creating new bullets
          var bulletObj=new bullets((bat.x+bat.imageWidth/3),(bat.y+bat.imageHeight/3),50,50,'images/fireball3.gif');
          bulletsArray.push(bulletObj);
          bulletSound1.play();
        }

        if(event.code=='KeyA' && bat.mainBooster===10)
        {   
            //special move on key A
            dashSound.play();
            bat.dash();
            bat.mainBooster=0;
        }
    }


    function gameLoop()
    {   if(Running===1)
        {
            update();
            render();
        }
        else{
            gameOverDisplay();
            //print gameover and your score and start againg
        } 

        requestAnimationFrame(gameLoop);
       
    }

    function gameOverDisplay()
    {
        clearCanvas();

        //Display GAME OVER text and sore
        ctx.fillStyle='#FFFFFF';
        ctx.font = '60px Arial';
        ctx.fillText('GAME OVER',250,300);
        ctx.font = '30px Arial';
        ctx.fillText('Score : ' +score ,380,380);

        //disply smily objects
        var smile =new Image();
        smile.src='images/simle.png';
        ctx.drawImage(smile,320,30);

        //simple restart text
        ctx.fillText('Press Enter to Restart ' ,290,500);

        //playing the ting sound at game over
        if(gameOverAudioPlayed===0)
        {
            gameOver.play();
            gameOverAudioPlayed=1;
        }
      
    }


    function update()
    {
        increamentPos();
        updateRocks();
        //checkScore();
        checkBulletCollision();
        checkCollision();
    }

    function render()
    {
        clearCanvas();
        backgroundSlider();
        drawRocks();
        if(bulletsArray.length>0)
        {
            drawBullets();
        }
        drawPlayer();
        drawScoreBoard();
        drawHealthBar();
        mainPowerBar();
    }

    //checking buttet collision with rocks
    function checkBulletCollision()
    {
        for(var i=0;i<bulletsArray.length;i++)
        {
            for(var j=0;j<rock.length;j++)
            {
               
                if (rock[j].x < bulletsArray[i].x + bulletsArray[i].imageWidth &&
                    rock[j].x + rock[j].width > bulletsArray[i].x &&
                    rock[j].y < bulletsArray[i].y + bulletsArray[i].imageHeight &&
                    rock[j].height + rock[j].y > bulletsArray[i].y)
                    
                    {
                        
                        rock[j].resetPos();
                        score++;
                        bat.increaseMainBooster();
                    }
            }
        }
    }

    //checking collision with rocks
    function checkCollision()
    {
        for(var i=0;i<rock.length;i++)
        {
            if (rock[i].x < bat.x + bat.imageWidth &&
                rock[i].x + rock[i].width > bat.x &&
                rock[i].y < bat.y + bat.imageHeight &&
                rock[i].height + rock[i].y > bat.y) {
                
                    if(bat.dashAction===1)
                    {
                       rock[i].resetPos();
                       score++;
                    }
                    else
                    {
                       // zitterAnimation();
                       crashSound.play();
                      // zitterAnimation=1;
                       //setTimeout(function(){ zitterAnimation =0 },0.25);
                        bat.healthBar--;
                        if(bat.healthBar===0)
                        {
                            Running=0;
                        }
                        
                    }
                  
             }
        }
    }

    function checkScore()
    {
        if(score%5==0)
        {
            rock.push(new Rock(600,-20,150,97,4,rockImages[random(0,3)]));
        }
    }


    //updating position of rock
    function updateRocks()
    {
        for(var i=0;i<rock.length;i++)
        {
          rock[i].update();
        }

        for(var i=0;i<bulletsArray.length;i++)
        {
            bulletsArray[i].bulletUpdate();
        }
        bat.posUpdate();
    }


    //increasing main power bar 
    function mainPowerBar()
    {
        ctx.strokeStyle='s#FFFFFF';
        ctx.strokeRect(890,150,10,500);
        ctx.fillStyle='#0000ff';
        ctx.fillRect(890,150,10,bat.mainBooster*50);
    }


    function drawScoreBoard()
    {
        ctx.fillStyle='#FFFFFF';
        ctx.font = '30px Arial';
        ctx.fillText('Score Board',850,50);
        ctx.fillText(score,850,90);
    }

    function drawHealthBar(){

        ctx.strokeStyle='#FFFFFF';
        ctx.strokeRect(850,150,30,500);

        if(bat.healthBar>300)
        {
            ctx.fillStyle='#00FF00';
        }
        else if (bat.healthBar>150){
            ctx.fillStyle='#ffcc66';
        }
        else{
            ctx.fillStyle='#ff0000';
        }
      
        ctx.fillRect(851,151,29,bat.healthBar);
    }

    function drawBullets()
    {
        for(var i=0;i<bulletsArray.length;i++)
        {
           context.drawImage(bulletsArray[i].element,bulletsArray[i].x,bulletsArray[i].y,bulletsArray[i].imageWidth,bulletsArray[i].imageHeight);
        }
    }
    
   function drawPlayer()
    {
  
            context.drawImage(bat.element,
                bat.spriteIndex*bat.spriteWidth,
                0,
                bat.spriteWidth,
                bat.spriteHeight,
                bat.x,
                bat.y,
                120,
                120 );
  

        if(bat.dashAction===1)
        {
            context.globalAlpha = 0.5;
            context.drawImage(bat.dashedImage,
                bat.x,
                bat.y,
                120,
                120 );
             context.globalAlpha = 1.0;
        }
    }

    function drawRocks()
    {
        for(var i=0;i<rock.length;i++)
        {
            context.drawImage(rock[i].element,rock[i].x,rock[i].y,rock[i].width,rock[i].height);
        }
      
    }

    function clearCanvas()
    {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function  backgroundSlider(){
        context.drawImage(caveBg,0,pos[0]);
        context.drawImage(caveBg,0,pos[1]);
        context.drawImage(caveBg,0,pos[2]);   
    }


    function increamentPos()
    {
        for(var i=0; i<pos.length;i++)
        {
            pos[i]=pos[i]+5;
            if(pos[i]>1816)
            {
                pos[i]=-908;
            }
        }
    }
}

function Rock(x,y,width,height,velocity=3,image='images/rock2.png')
{
    var posArray=[90,360,640];
    this.x=posArray[random(0,3)];
    this.y=y;
    this.width=width;
    this.height=height;
    this.img='images/rock2.png';
    this.element=new Image(); 
    this.imageWidth=120;
    this.imageHeight=120;
    this.velocity=velocity;
    this.element.src=image;
    


    this.update=function()
                    {
                        this.y=this.y+this.velocity;
                        if(this.y>800)
                        {
                            this.y=-508;
                            var temp=random(0,3);
                            this.x=posArray[temp];
                        }
                    }

    this.resetPos=function()
    {
        this.y=-508;
        this.x=posArray[random(0,3)];
    }
  
}


function Player(image='images/batSprite.png',spriteSize=200,spriteHeight=200)
{
    this.y=500;
    var count=0;
    var delay=20;
    this.deltax=0;
    this.deltay=0;
    this.dashAction=0;
    this.healthBar=500;
    this.spriteIndex=4;
    this.mainBooster=10;
    var increaseFlag=0;
    this.imageWidth=120;
    this.imageHeight=120;
    this.spriteHeight=200;
    this.posIndex=random(0,3);
    var posArray=[90,355,635];
    this.dashedImage=new Image();   
    this.spriteWidth=spriteSize;
    this.x=posArray[this.posIndex]; 
    this.dashedImage.src='images/dashed.png'; 
    

   this.element=new Image();
   this.element.src=image;

   this.posUpdate=function(){
      this.x=this.x+this.deltax;
      this.y=this.y+this.deltay;

      if(this.y<-100)
      {
          this.y=500;
          this.deltay=0;
          this.dashAction=0;
      }

      else{
         if(delay===count)
         {
             count=0;

            if(increaseFlag===0)
            {
                this.spriteIndex--;
                if(this.spriteIndex<3)
                {
                    this.spriteIndex=this.spriteIndex+2;
                    increaseFlag=1;
                } 
            }
           else if(increaseFlag===1)
            {
                this.spriteIndex++;
                if(this.spriteIndex>5)
                {
                  this.spriteIndex=this.spriteIndex-2;
                  increaseFlag=0;
                }
            }
         } 
        count++;
      }
   }


   this.stepRight=function()
   {
       if(this.posIndex<posArray.length-1)
       {
        this.posIndex++;
        this.x=posArray[this.posIndex];
       }
   }

   this.stepLeft=function()
   {
       if(this.posIndex>0)
       {
        this.posIndex--;
        this.x=posArray[this.posIndex];
       }

   }

   this.dash=function()
   {
       this.deltay=-7;
       this.dashAction=1;
   }

   this.increaseMainBooster=function()
   {
       if(this.mainBooster<10)
       {
           this.mainBooster++;
       }
   }
}

function bullets(x,y,imageWidth,imageHeight,source)
{
    this.x=x;
    this.y=y;
    this.element=new Image();
    this.element.src=source;
    this.imageWidth=imageWidth;
    this.imageHeight=imageHeight;
   

    this.bulletUpdate=function()
    {
        this.y=this.y-5;

        if(this.y<-400)
        {
            bulletsArray.shift();
        }
    }
}


function random(start,end)
{
    return Math.floor(Math.random()*end+start)
}
